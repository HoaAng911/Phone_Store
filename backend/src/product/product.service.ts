import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { ProductImage } from './entity/product-image.entity';
import { PhoneSpecification } from './entity/phone-specification.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,

    @InjectRepository(ProductImage)
    private readonly imageRepo: Repository<ProductImage>,

    @InjectRepository(PhoneSpecification) 
    private readonly specRepo: Repository<PhoneSpecification>,
  ) { }

  /**
   *  Tạo sản phẩm mới
   */
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { images, specification, ...productData } = createProductDto;

    const product = this.productRepo.create(productData);

    if (specification) {
      product.specification = this.specRepo.create(specification);
    }

    if (images?.length) {
      product.images = images.map((img) => this.imageRepo.create({ url: img.url }));
    }

    return await this.productRepo.save(product);
  }

  /**
   *  Lấy danh sách sản phẩm có filter, sort, pagination
   */
  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 5,
      search,
      brand,
      priceMax,
      sort,
    } = query;

    const skip = (page - 1) * limit;

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.specification', 'specification');

    //  Tìm kiếm theo tên hoặc thương hiệu
    if (search) {
      qb.andWhere('(product.name LIKE :search OR product.brand LIKE :search)', {
        search: `%${search}%`,
      });
    }

    // Lọc theo thương hiệu
    if (brand) {
      qb.andWhere('product.brand = :brand', { brand });
    }

    //  Lọc theo giá tối đa
    if (priceMax) {
      qb.andWhere('product.price <= :priceMax', { priceMax });
    }

    //  Sắp xếp
    switch (sort) {
      case 'price_asc':
        qb.orderBy('product.price', 'ASC');
        break;
      case 'price_desc':
        qb.orderBy('product.price', 'DESC');
        break;
      case 'oldest':
        qb.orderBy('product.createdAt', 'ASC');
        break;
      case 'newest':
      default:
        qb.orderBy('product.createdAt', 'DESC');
        break;
    }

    const [data, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      data,
      total,
      limit,
      page,
      totalPage: Math.ceil(total / limit),
    };
  }

  /**
   *  Lấy chi tiết sản phẩm theo ID
   */
  async findOne(id: string): Promise<ProductEntity> {
    if (!id || !/^\d+$/.test(id)) {
    throw new NotFoundException('ID sản phẩm không hợp lệ');
  }

    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['specification', 'images'],
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID ${id}`);
    }

    return product;
  }

  /**
   *  Cập nhật thông tin sản phẩm
   */
  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);
    const { images, specification, ...updateData } = updateProductDto;

    Object.assign(product, updateData);

    //  Cập nhật thông số kỹ thuật
    if (specification) {
      if (product.specification) {
        Object.assign(product.specification, specification);
      } else {
        product.specification = this.specRepo.create(specification);
      }
    }

    //  Cập nhật hình ảnh
    if (images) {
      await this.imageRepo.delete({ product: { id } });
      product.images = images.map((img) => this.imageRepo.create({ url: img.url }));
    }

    return await this.productRepo.save(product);
  }

  /**
   *  Xóa sản phẩm
   */
  async remove(id: string): Promise<{ message: string }> {
    const product = await this.findOne(id);

    if (product.images?.length) {
      await this.imageRepo.delete({ product: { id } });
    }

    if (product.specification) {
      await this.specRepo.delete({ id: product.specification.id });
    }

    await this.productRepo.delete(id);

    return { message: `Sản phẩm có ID ${id} đã được xóa thành công.` };
  }

  /**
   * Kiểm tra sản phẩm tồn tại
   */
  async exists(id: string): Promise<boolean> {
    return await this.productRepo.exists({ where: { id } });
  }

  /**
   *  Thống kê sản phẩm
   */
  async getProductStat() {
    const totalProduct = await this.productRepo.count();

    const stockData = await this.productRepo
      .createQueryBuilder('product')
      .select('SUM(product.stock)', 'totalStock')
      .addSelect('SUM(product.stock * product.price)', 'totalStockValue')
      .getRawOne();

    const totalStock = Number(stockData.totalStock) || 0;
    const totalStockValue = Number(stockData.totalStockValue) || 0;

    const inStockCount = await this.productRepo.count({
      where: { stock: MoreThan(0) },
    });

    const outStockCount = await this.productRepo.count({
      where: { stock: 0 },
    });

    const brandStats = await this.productRepo
      .createQueryBuilder('product')
      .select('product.brand', 'brand')
      .addSelect('COUNT(product.id)', 'count')
      .groupBy('product.brand')
      .getRawMany();

    const resultBrand = brandStats.map((r) => ({
      brand: r.brand,
      count: Number(r.count),
    }));

    return {
      totalProduct,
      totalStock,
      totalStockValue,
      inStockCount,
      outStockCount,
      resultBrand,
    };
  }
}

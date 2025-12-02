import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, MoreThanOrEqual, IsNull } from 'typeorm';
import { ProductCategory, ProductEntity } from './entity/product.entity';
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

  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 5,
      search,
      brand,
      priceMax,
      priceMin,
      sort,
      category,
    } = query;

    const skip = (page - 1) * limit;

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.specification', 'specification');


    if (search) {
      qb.andWhere('(product.name LIKE :search OR product.brand LIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (category) {
      qb.andWhere('product.category = :category', { category });
    }
    if (brand) {
      qb.andWhere('product.brand = :brand', { brand });
    }

    if (priceMin) {
      qb.andWhere('product.price >= :priceMin', { priceMin });
    }
    if (priceMax) {
      qb.andWhere('product.price <= :priceMax', { priceMax });
    }


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

  async findOne(id: string): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['specification', 'images'],
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID ${id}`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);
    const { images, specification, ...updateData } = updateProductDto;

    Object.assign(product, updateData);


    if (specification) {
      if (product.specification) {
        Object.assign(product.specification, specification);
      } else {
        product.specification = this.specRepo.create(specification);
      }
    }


    if (images) {
      await this.imageRepo.delete({ product: { id } });
      product.images = images.map((img) => this.imageRepo.create({ url: img.url }));
    }

    return await this.productRepo.save(product);
  }


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

  async exists(id: string): Promise<boolean> {
    return await this.productRepo.exists({ where: { id } });
  }

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
  getCategories(): string[] {
    return Object.values(ProductCategory)
  }
  async getAllCategoryNow(): Promise<string[]> {
    const categories = await this.productRepo
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .getRawMany();

    return categories.map((c) => String(c.category));
  }
  async getProductsByCategory(category: string) {
    return await this.productRepo.find({
      where: { category },
      relations: ['images', 'specification'],
    })
  }
  async getFeaturedProducts(limit = 8): Promise<ProductEntity[]> {
    return await this.productRepo.find({
      where: { isFeatured: true },
      order: { createdAt: 'DESC' },
      relations: ['images'],
      take: limit
    })
  }
  async getNewProduct():Promise<ProductEntity[]>{
    return await this.productRepo.find({
      order:{createdAt:'desc'},
      relations:['images'],
      take:10
    })
  }
  async getFlashSale(limit = 6): Promise<ProductEntity[]> {
    const now = new Date();

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .where(
        `(
        (product.discountPercent >= :minDiscount AND product.flashSaleUntil > :now AND product.stock >= :minStock)
        OR
        (product.discountPercent >= :minDiscount AND product.flashSaleUntil IS NULL AND product.stock >= :minStock)
      )`,
        {
          minDiscount: 15,
          now,
          minStock: 5,
        },
      )
      .orderBy('product.discountPercent', 'DESC')
      .addOrderBy('product.createdAt', 'DESC')
      .select([
        'product.id',
        'product.name',
        'product.price',
        'product.originalPrice',
        'product.discountPercent',
        'product.flashSaleUntil',
        'product.stock',
        'product.createdAt',
        'images.url',
      ])
      .take(limit);

    return await qb.getMany();
  }
  async toggleFlashSale(id: string, hours?: number): Promise<ProductEntity> {
    const product = await this.findOne(id)

    if (!hours) {
      product.flashSaleUntil = undefined
    } else {
      product.flashSaleUntil = new Date(Date.now() + hours * 60 * 60 * 1000)
    }
    return this.productRepo.save((product))
  }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';
import { PhoneSpecification } from './phone-specification.entity';
import { ProductEntity } from './product.entity';
import { MoreThan, Repository } from 'typeorm';
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
  ) {}

  // Tạo sản phẩm
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { images, specification, ...productData } = createProductDto;
    const product = this.productRepo.create(productData);

    if (specification) {
      product.specification = this.specRepo.create(specification);
    }
    if (images && images.length > 0) {
      product.images = images.map(img => this.imageRepo.create({ url: img.url }));
    }

    return this.productRepo.save(product);
  }

  // Lấy tất cả sản phẩm
 async findAll(query:ProductQueryDto){
  // Lay tu dto
  const {page=1,limit=5,search,brand,priceMax,sort} = query;
  const skip = (page-1)*limit
  const qb = this.productRepo
  .createQueryBuilder('product')
  .leftJoinAndSelect('product.images','images')
  .leftJoinAndSelect('product.specification','specification')
  //Tim kiem
  if(search){
    qb.andWhere('product.name LIKE :search OR product.brand LIKE :search',{search:`${search}`})
  }
  //Loc theo thuong hieu
  if(brand){
    qb.andWhere('product.brand=:brand',{brand})
  }
  //loc theo gia toi da
  if(priceMax){
    qb.andWhere('product.price <=:priceMax',{priceMax})
  }
  // loc san pham
  switch(sort){
    case 'price_asc':
      qb.orderBy('product.price','ASC')
      break;
    case 'price_desc':
      qb.orderBy('product.price','DESC')
      break;
    case 'oldest':
      qb.orderBy('product.id','ASC')
      break;
    case 'newest':
      qb.orderBy('product.id','DESC')
  }
  // Phan trang
  const [data,total] = await qb.skip(skip).take(limit).getManyAndCount()
  return{
    data,total,limit,page,totalPage:Math.ceil(total/limit)
  }
 }
  // Lấy một sản phẩm
async findOne(id: number): Promise<ProductEntity> {
  try {
    if (!id || isNaN(id) || id <= 0) {
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
  } catch (error) {
    console.error(`Lỗi khi tìm sản phẩm với ID ${id}:`, error);
    throw error instanceof NotFoundException
      ? error
      : new InternalServerErrorException('Lỗi server khi tìm sản phẩm');
  }
}

  // Cập nhật sản phẩm
  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
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
      product.images = images.map(img => this.imageRepo.create({ url: img.url }));
    }

    return this.productRepo.save(product);
  }

  // Xóa sản phẩm
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);

    if (product.images?.length) {
      await this.imageRepo.delete({ product: { id } });
    }
    if (product.specification) {
      await this.specRepo.delete({ id: product.specification.id });
    }
    await this.productRepo.delete(id);

    return { message: `Product with id ${id} has been deleted.` };
  }

  // Kiểm tra sản phẩm tồn tại
  async exists(id: number): Promise<boolean> {
    return this.productRepo.exists({ where: { id } });
  }
  //Thong ke san pham
  async getProductStat(){
    const totalProduct = await this.productRepo.count()
    const Stock = await this.productRepo
    .createQueryBuilder('product')
    .select('SUM(product.stock)','totalStock')
    .addSelect('SUM(product.stock*product.price)','totalStockValue').getRawOne()
      const totalStock = Number(Stock.totalStock) || 0;
      const totalStockValue = Number(Stock.totalStockValue)||0
      //So san pham con hang 
      const inStockCount = await this.productRepo.count({where:{stock:MoreThan(0)}})
      const outStockCount = totalStock-inStockCount
      //Thong ke theo brand
      const brand = await this.productRepo.createQueryBuilder('product')
      .select('product.brand','brand')
      .addSelect('COUNT(product.id)','count')
      .groupBy('product.brand')
      .getRawMany()

    const resultBrand = brand.map(r =>({
      brand:r.brand,
      count:Number(r.count)
    }))

      return {totalProduct,totalStock,inStockCount,outStockCount,resultBrand,totalStockValue}
  }
}
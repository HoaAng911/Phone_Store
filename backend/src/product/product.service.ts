/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';
import { PhoneSpecification } from './phone-specification.entity';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { create } from 'domain';
import { promises } from 'dns';
import { UpdateProductDto } from './dto/update-product.dto';

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
  //Tao san pham (Dien thoai)
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    //images,specification la entity khac lien he voi product nen tach rieng ra 
    const { images, specification, ...productData } = createProductDto
    //Tao san pham
    const product = this.productRepo.create(productData)
    //Gan specification(thong tin dien thoai neu co)
    if (specification) {
      const spec = this.specRepo.create(specification)
      product.specification = spec
    }
    //Gan link anh neu co 
     if (images && images.length > 0) {
   product.images = images.map(img => this.imageRepo.create({ url: img.url }));
    }

    //Luu san pham
    return this.productRepo.save(product)
  }
  async findAll(): Promise<ProductEntity[]> {
    return this.productRepo.find({
      relations: ['specification', 'images'],//Lay cac thuoc tinh cua cac quan he
      order: { id: 'DESC' } // sap xep tu id lon ve id be tuc la lay id moi nhat ve id cu nhat
    })
  }
  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['specification', 'images']
    })

    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm')
    return product
  }
  //Update san pham
  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id)

    const { images, specification, ...updateData } = updateProductDto
    Object.assign(product, updateData)

    //Cap nhat specification
    if (specification) {
      if (product.specification) {
        Object.assign(product.specification, specification)
      } else {
        const newSpec = this.specRepo.create(specification)
        product.specification = newSpec
      }
    }

    //Cap nhat anh
      // Cập nhật ảnh
  // Cập nhật ảnh
    if (images) {
      // Xóa ảnh cũ
      await this.imageRepo.delete({ product: { id } });

      // Thêm ảnh mới
      product.images = images.map((img) => this.imageRepo.create({ url: img.url }));
    }
    return this.productRepo.save(product)
  }
  async remove(id: number): Promise<{ message: string }> {

    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['specification', 'images']
    })
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm')

    //Xoa anh neu co
    if (product.images?.length) {
      await this.imageRepo.delete({ product: { id } })
    }
    //Xoa thong tin san pham
    if (product.specification) {
      await this.specRepo.delete({ id: product.specification.id })
    }
    await this.productRepo.delete(id)


    return { message: `Product with id ${id} has been deleted.` };
  }
}

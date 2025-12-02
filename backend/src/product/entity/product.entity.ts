// src/product/entity/product.entity.ts
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhoneSpecification } from './phone-specification.entity';
import { ProductImage } from './product-image.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { Product_Review } from '../review/product-review.entity';

export enum ProductCategory {
  PHONE = 'phone',
  LAPTOP = 'laptop',
  TABLET = 'tablet',
  ACCESSORIES = 'accessories',
}

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Tên & mô tả
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ length: 500, nullable: true })
  shortDescription?: string;

  @Column({ type: 'text' })
  description: string;

  // Giá & khuyến mãi
  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  originalPrice: number;

  @Column({ type: 'int', default: 0 })
  discountPercent: number;

  // Thông tin sản phẩm
  @Column({ type: 'varchar', length: 100 })
  brand: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.PHONE,
  })
  category: string;

  // Tồn kho & bán hàng
  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ default: 0 })
  soldCount: number;
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  rating: number;
  @Column({ default: 0 }) reviewCount: number;
  @Column({ default: 0 })
  viewCount: number;

  @OneToMany(() => Product_Review, (review) => review.product,{
    cascade: true
  })
  
  reviews: Product_Review[];

  // Trạng thái
  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'out_stock'],
    default: 'active',
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  // Thời gian
  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', precision: 6 })
  deletedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  flashSaleUntil?: Date
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images?: ProductImage[];

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts?: CartEntity[];

  @OneToOne(() => PhoneSpecification, (spec) => spec.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  specification?: PhoneSpecification;
}
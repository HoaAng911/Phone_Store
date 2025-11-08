import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhoneSpecification } from './phone-specification.entity';
import { ProductImage } from './product-image.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';

@Entity('products')
export class ProductEntity {

  @PrimaryGeneratedColumn({type:'bigint'})
  id: string;

  //Ten &mo ta
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ length: 500, nullable: true })
  shortDescription?: string
  @Column({ type: 'text' })
  description: string;
  //Gia & Khuyen mai
  @Column({ type: 'int', default: 0 })
  price: number;
  @Column({ type: 'int', default: 0 })
  originalPrice: number
  @Column({ type: 'int', default: 0 })
  discountPercent: number
  //Thong tin san pham
  @Column({ type: 'varchar', length: 100 })
  brand: string;
  @Column({ type: 'varchar', length: 50, unique: true })
  sku: string
  @Column({
    type: 'enum',
    enum: ['phone', 'laptop', 'tablet', 'accessories'],
    default: 'phone'
  })
  category: string;
  //Ton kho &Ban hang
  @Column({ type: 'int', default: 0 })
  stock: number;
  @CreateDateColumn({ default: 0 })
  soldCount: number//so luong da ban
  @CreateDateColumn({ default: 0 })
  viewCount: number
  //Danh gia
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  rating: number
  @CreateDateColumn({ default: 0 })
  reviewCount: number
  //Trang thai
  @Column({type:'enum',enum:['active','inactive','out_stock'],default:'active'})
  status:string
  //Thoi gian
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images: ProductImage[];
  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts?: CartEntity
  /** Thông số kỹ thuật chi tiết */
  @OneToOne(() => PhoneSpecification, (spec) => spec.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable:true
  })
  @JoinColumn()
  specification?: PhoneSpecification;
}

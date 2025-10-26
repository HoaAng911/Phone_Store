import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhoneSpecification } from './phone-specification.entity';
import { ProductImage } from './product-image.entity';

@Entity('product')
export class ProductEntity {
  /** Mã sản phẩm (tự sinh) */
  @PrimaryGeneratedColumn()
  id: number;

  /** Tên sản phẩm */
  @Column({ type: 'varchar', length: 255 })
  name: string;

  /** Mô tả chi tiết sản phẩm */
  @Column({ type: 'text' })
  description: string;

  /** Giá sản phẩm (VNĐ) */
  @Column({ type: 'int', default: 0 })
  price: number;

  /** Thương hiệu sản phẩm */
  @Column({ type: 'varchar', length: 100 })
  brand: string;

  /** Số lượng tồn kho */
  @Column({ type: 'int', default: 0 })
  stock: number;

  /** Thời điểm tạo */
  @CreateDateColumn()
  createdAt: Date;

  /** Thời điểm cập nhật gần nhất */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Danh sách hình ảnh của sản phẩm */
  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images: ProductImage[];

  /** Thông số kỹ thuật chi tiết */
  @OneToOne(() => PhoneSpecification, (spec) => spec.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  specification: PhoneSpecification;
}

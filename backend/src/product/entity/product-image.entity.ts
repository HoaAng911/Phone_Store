import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_image')
export class ProductImage {
  /** Mã ảnh (tự sinh) */
  @PrimaryGeneratedColumn({type:'bigint'})
  id: string;

  /** Đường dẫn ảnh sản phẩm */
  @Column({ type: 'varchar', length: 500 })
  url: string;

  /** Thời điểm ảnh được thêm vào */
  @CreateDateColumn()
  createdAt: Date;

  /** Sản phẩm mà ảnh này thuộc về */
  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}

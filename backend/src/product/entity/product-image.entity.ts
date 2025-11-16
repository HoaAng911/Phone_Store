import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,

} from 'typeorm';
import { ProductEntity } from './product.entity';
import { v4 as uuidv4 } from 'uuid';
@Entity('product_image')
export class ProductImage {
  /** Mã ảnh (tự sinh) */
    @PrimaryGeneratedColumn('uuid')
    id: string; 

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('phone_specification')
export class PhoneSpecification {
  /** Mã thông số kỹ thuật (tự sinh) */
  @PrimaryGeneratedColumn()
  id: number;

  /** Kích thước màn hình (inch) */
  @Column({ type: 'varchar', length: 100, nullable: true })
  screenSize?: string;

  /** Độ phân giải màn hình */
  @Column({ type: 'varchar', length: 100, nullable: true })
  resolution?: string;

  /** Bộ xử lý (CPU) */
  @Column({ type: 'varchar', length: 100, nullable: true })
  cpu?: string;

  /** Dung lượng RAM */
  @Column({ type: 'varchar', length: 50, nullable: true })
  ram?: string;

  /** Dung lượng lưu trữ */
  @Column({ type: 'varchar', length: 50, nullable: true })
  storage?: string;

  /** Dung lượng pin */
  @Column({ type: 'varchar', length: 50, nullable: true })
  battery?: string;

  /** Hệ điều hành */
  @Column({ type: 'varchar', length: 100, nullable: true })
  os?: string;

  /** Thông tin camera */
  @Column({ type: 'varchar', length: 255, nullable: true })
  camera?: string;

  /** Loại SIM hỗ trợ */
  @Column({ type: 'varchar', length: 100, nullable: true })
  sim?: string;

  /** Trọng lượng thiết bị */
  @Column({ type: 'varchar', length: 50, nullable: true })
  weight?: string;

  /** Danh sách màu sắc có sẵn */
  @Column({ type: 'simple-json', nullable: true })
  colors?: string[];

  /** Quan hệ 1-1 với sản phẩm */
  @OneToOne(() => ProductEntity, (product) => product.specification, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductEntity;

  /** Ngày tạo bản ghi */
  @CreateDateColumn()
  createdAt: Date;

  /** Ngày cập nhật bản ghi */
  @UpdateDateColumn()
  updatedAt: Date;
}

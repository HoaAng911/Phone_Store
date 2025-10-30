import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import {
  IsBoolean,
  IsString,
} from 'class-validator';
import { UserEntity } from './user.entity';
import { OrderEntity } from 'src/order/entity/order.entity';

@Entity('addresses')
export class AddressEntity {
  /** Khóa chính tự tăng */
  @PrimaryGeneratedColumn()
  id: number;

  /** Đường phố */
  @IsString({ message: 'Đường phố phải là chuỗi ký tự' })
  @Column()
  street: string;

  /** Thành phố */
  @IsString({ message: 'Thành phố phải là chuỗi ký tự' })
  @Column()
  city: string;

  /** Quốc gia */
  @IsString({ message: 'Quốc gia phải là chuỗi ký tự' })
  @Column()
  country: string;

  /** Mã bưu điện */
  @IsString({ message: 'Mã bưu điện phải là chuỗi ký tự' })
  @Column()
  postalCode: string;

  /** Có phải địa chỉ mặc định hay không */
  @IsBoolean()
  @Column({ default: true })
  isDefault: boolean;
  /** Quan hệ n-1: nhiều địa chỉ thuộc về một user */
  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}

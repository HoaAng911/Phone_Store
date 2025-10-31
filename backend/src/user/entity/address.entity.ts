// src/user/entity/address.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import {
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { UserEntity } from './user.entity';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // === BẮT BUỘC ===
  @IsString({ message: 'Họ tên không được để trống' })
  @Column()
  fullName: string;

  @IsString({ message: 'Số điện thoại không được để trống' })
  @Column()
  phone: string;

  @IsString({ message: 'Đường không được để trống' })
  @Column()
  street: string;

  @IsString({ message: 'Thành phố không được để trống' })
  @Column()
  city: string;

  @IsString({ message: 'Quận không được để trống' })
  @Column()
  district: string;

  @IsString({ message: 'Phường không được để trống' })
  @Column()
  ward: string;

  // === TÙY CHỌN ===
  @IsString()
  @Column({ default: 'Việt Nam' })
  country: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  postalCode?: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  // === QUAN HỆ ===
  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
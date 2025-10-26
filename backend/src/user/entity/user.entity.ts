import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity {
  /** Khóa chính tự tăng */
  @PrimaryGeneratedColumn()
  id: number;

  /** Tên người dùng */
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  @Column()
  name: string;

  /** Email người dùng — duy nhất */
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Column({ unique: true })
  email: string;

  /** Mật khẩu (đã hash) */
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @Column()
  password: string;

  /** Số điện thoại — không bắt buộc */
  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  @Column({ nullable: true })
  phoneNumber?: string;

  /** Quan hệ 1-nhiều: 1 user có thể có nhiều địa chỉ */
  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  /** Vai trò người dùng (user hoặc admin) */
  @Column({ default: 'user' })
  role: string;

  /** Lần đăng nhập gần nhất */
  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  lastLogin?: Date;

  /** Thời điểm tạo user */
  @CreateDateColumn()
  createdAt: Date;

  /** Thời điểm cập nhật gần nhất */
  @UpdateDateColumn()
  updatedAt: Date;
}

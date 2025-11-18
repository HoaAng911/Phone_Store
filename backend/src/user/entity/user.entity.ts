import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { AddressEntity } from './address.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { OrderEntity } from 'src/order/entity/order.entity';
import { Product_Review } from 'src/product/review/product-review.entity';

@Entity('users')
@Index(['phoneNumber'])
export class UserEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  @Column({ length: 100 })
  username: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Column({ unique: true, length: 255 })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @Column({ select: false })
  password: string;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  @Column({ nullable: true, length: 20 })
  phoneNumber?: string;


  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];
  @OneToOne(() => CartEntity, (cart) => cart.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: CartEntity;



  @OneToMany(() => OrderEntity, (orders) => orders.user, { cascade: false, eager: false })
  orders: OrderEntity;
  @IsIn(['user', 'admin'], { message: 'Vai trò phải là user hoặc admin' })
  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';

  @OneToMany(() => Product_Review, (review) => review.user)
  reviews: Product_Review[];

  @IsOptional()
  @Column({ nullable: true, type: 'timestamp' })
  lastLogin?: Date;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}

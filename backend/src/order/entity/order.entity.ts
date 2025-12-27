// src/order/entities/order.entity.ts
import { AddressEntity } from "src/address/address.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { Type } from 'class-transformer';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => AddressEntity, { nullable: true })
  address: AddressEntity;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  @Type(() => Number)
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];
}
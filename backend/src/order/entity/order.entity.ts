import { AddressEntity } from "src/user/entity/address.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";



@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({type:"bigint"})
  id: string
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity
  @ManyToOne(() => AddressEntity, { nullable:true })
  address: AddressEntity;
  @Column({ default: 'pending' })
  status: string
  @Column({ type: 'decimal', default: 0 })
  totalPrice:number
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(()=>OrderItemEntity,(item)=>item.order,{cascade:true})
  items:OrderItemEntity[]
}
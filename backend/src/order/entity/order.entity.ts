import { AddressEntity } from "src/user/entity/address.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { OrderItemEntity } from "./order-item.entity";



@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  id: number
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity
  @ManyToOne(() => AddressEntity, { cascade: true })
  address: AddressEntity;
  @Column({ default: 'pending' })
  status: string
  @Column({ type: 'int', default: 0 })
  totalPrice:number
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(()=>OrderItemEntity,(item)=>item.order,{cascade:true})
  item:OrderItemEntity[]
}
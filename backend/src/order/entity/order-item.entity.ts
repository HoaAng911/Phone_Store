import { ProductEntity } from "src/product/entity/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";


@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => ProductEntity)
  product: ProductEntity
  @ManyToOne(() => OrderEntity,(order)=>order.items,{onDelete:'CASCADE'})
  order: OrderEntity
  @Column()
  quantity:number
  @Column({type:'int'})
  price:number
}

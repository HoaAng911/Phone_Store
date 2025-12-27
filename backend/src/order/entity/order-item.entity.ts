
import { ProductEntity } from "src/product/entity/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { Type } from 'class-transformer'; 
import { IsInt, Min } from 'class-validator'; 

@Entity('order_item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @Column()
  @Type(() => Number)    
  @IsInt()
  @Min(1)
  quantity: number;

  @Column({ type: 'int' })
  @Type(() => Number)    
  @IsInt()
  price: number;
}
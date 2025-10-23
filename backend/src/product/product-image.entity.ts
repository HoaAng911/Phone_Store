import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('product_image')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  url:string
  @ManyToOne(()=>ProductEntity,(product)=>product.images)
  product:ProductEntity
}
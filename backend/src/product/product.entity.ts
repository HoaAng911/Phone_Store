import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhoneSpecification } from "./phone-specification.entity";
import { ProductImage } from "./product-image.entity";


@Entity('product')
export class ProductEntity{
  //Tu sinh khoa
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  name:string
  @Column('text')
  description:string
  @Column()
  price:number
  @Column()
  brand:string
  @Column({default:true})
  stock:number
  @OneToMany(()=>ProductImage,(images)=>images.product,{cascade:true, onDelete: 'CASCADE'})
  images?:ProductImage[]
  @OneToOne(()=>PhoneSpecification,(spec)=>spec.product,{cascade:true, onDelete: 'CASCADE'})
  @JoinColumn()
  specification:PhoneSpecification
}
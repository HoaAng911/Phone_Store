import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import {UserEntity} from '../../user/entity/user.entity'
import { ProductEntity } from "../entity/product.entity";
@Entity('product_reviews')
export class Product_Review{
  @PrimaryGeneratedColumn('uuid')
  id:string
  @Column({type:'int'})
  rating:number
  @Column({type:'text',nullable:true})
  comment?:string 
  @ManyToOne(()=>UserEntity,(user)=>user.reviews,{
    onDelete:'CASCADE'
  })
  user:UserEntity
  @ManyToOne(()=>ProductEntity,(product)=>product.reviews,{
    onDelete:'CASCADE'
  })
  product:ProductEntity
    @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
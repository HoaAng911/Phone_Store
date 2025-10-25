import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn ,UpdateDateColumn} from "typeorm";
import { PhoneSpecification } from "./phone-specification.entity";
import { ProductImage } from "./product-image.entity";



@Entity('product')
export class ProductEntity{
  //Tu sinh khoa
  @PrimaryGeneratedColumn()
  id:number
  @Column({nullable:false})
  name:string
  @Column('text',{nullable:false})
  description:string
  @Column({type:'int',default:0})
  price:number
  @Column()
  brand:string
  @Column({ type: 'int', default: 0 })
  stock:number
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(()=>ProductImage,(images)=>images.product,{cascade:true, onDelete: 'CASCADE'})
  images:ProductImage[]
    @OneToOne(()=>PhoneSpecification,(spec)=>spec.product,{cascade:true, onDelete: 'CASCADE'})
  @JoinColumn()
  specification:PhoneSpecification
}
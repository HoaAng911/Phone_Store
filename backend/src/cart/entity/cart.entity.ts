import { ProductEntity } from "src/product/entity/product.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ type: 'bigint', nullable: false })
  userId: string
  @Column({ type: 'bigint', nullable: false })
  productId: string
  @Column({ default: 1 })
  quantity: number
  @Column({ type: 'varchar', length: 50, nullable: false })
  selectedColor:string
  @ManyToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: UserEntity
  @ManyToOne(() => ProductEntity, (product) => product.carts)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

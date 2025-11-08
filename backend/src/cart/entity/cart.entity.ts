import { ProductEntity } from "src/product/entity/product.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn({type:'bigint'})
  id: string
  @Column({type:'bigint',nullable:false})
  userId: string
  @Column({type:'bigint',nullable:false})
  productId: string
  @Column({ default: 1 })
  quantity: number
  @ManyToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: UserEntity
  @ManyToOne(() => ProductEntity, (product) => product.carts)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity
  /** Thời điểm tạo */
  @CreateDateColumn()
  createdAt: Date;

  /** Thời điểm cập nhật gần nhất */
  @UpdateDateColumn()
  updatedAt: Date;
}

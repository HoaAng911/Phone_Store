import { ProductEntity } from "src/product/entity/product.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  userId: number
  @Column()
  productId: number
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

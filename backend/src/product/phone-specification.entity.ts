import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity()
export class PhoneSpecification {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ nullable: true })
  screenSize: string
  @Column({ nullable: true })
  resolution: string
  @Column({ nullable: true })
  cpu: string
  @Column({ nullable: true })
  ram: string
  @Column({ nullable: true })
  storage: string
  @Column({ nullable: true })
  battery: string
  @Column({ nullable: true })
  os: string
  @Column({ nullable: true })
  camera: string
  @Column({ nullable: true })
  sim: string
  @Column({ nullable: true })
  weight: string
  @Column({ type: 'simple-json', nullable: true })
colors: string[];

  @OneToOne(() => ProductEntity, (product) => product.specification)
  product: ProductEntity
}
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { v4 as uuidv4 } from 'uuid';
@Entity('phone_specification')
export class PhoneSpecification {

  @PrimaryGeneratedColumn('uuid')
  id: string; 
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  screenSize?: string;

  
  @Column({ type: 'varchar', length: 100, nullable: true })
  resolution?: string;

  
  @Column({ type: 'varchar', length: 100, nullable: true })
  cpu?: string;


  @Column({ type: 'varchar', length: 50, nullable: true })
  ram?: string;

 
  @Column({ type: 'varchar', length: 50, nullable: true })
  storage?: string;


  @Column({ type: 'varchar', length: 50, nullable: true })
  battery?: string;

 
  @Column({ type: 'varchar', length: 100, nullable: true })
  os?: string;

 
  @Column({ type: 'varchar', length: 255, nullable: true })
  camera?: string;

  
  @Column({ type: 'varchar', length: 100, nullable: true })
  sim?: string;

  
  @Column({ type: 'varchar', length: 50, nullable: true })
  weight?: string;

  @Column({ type: 'simple-json', nullable: true })
  colors?: string[];


  @OneToOne(() => ProductEntity, (product) => product.specification, {
    onDelete: 'CASCADE',
    nullable: true
  })
  product?: ProductEntity;


  @CreateDateColumn()
  createdAt: Date;

  
  @UpdateDateColumn()
  updatedAt: Date;
}

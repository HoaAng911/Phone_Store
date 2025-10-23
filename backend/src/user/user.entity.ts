import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('users')
export class UserEntity {
  //tu sinh khoa
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  name:string;
  @Column()
  email:string;
  @Column()
  password:string;
  @Column({default:'user'})
  role:string; //role user:admin
  @CreateDateColumn()
  createAt:Date
  @UpdateDateColumn()
  updateAt:Date
}
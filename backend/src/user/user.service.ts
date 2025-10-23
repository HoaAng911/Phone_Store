import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt'
@Injectable()
export class UserService {

  //contructor
  constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>){}

  //Tim tat ca 
  findAll():Promise<UserEntity[]>{
    return this.userRepo.find()
  }
  //Tim theo id :trong entity id = number
  async findOne(id:number): Promise<UserEntity>{
    const user = await this.userRepo.findOne({where:{id}})
    if(!user){ throw new NotFoundException('Khong tim thay user')}
    return user
  }
  //Tao user
  async create(data:CreateUserDto): Promise<UserEntity>{
     if(data.password){
      data.password = await bcrypt.hash(data.password,10) //hash password truoc khi luu
    }
    const user = this.userRepo.create(data)
    return this.userRepo.save(user)
  }
  //Update user id
  async update(id:number,data:UpdateUserDto):Promise<UserEntity>{
    const user = await this.findOne(id)
    if(data.password){
      data.password = await bcrypt.hash(data.password,10)
    }
    Object.assign(user,data)
    return this.userRepo.save(user)  }
    //xoa user theo id
  async remove(id:number):Promise<{message:string}>{
    const user = await this.findOne(id)
      await this.userRepo.remove(user);
      return { message: `Đã xóa user có id = ${id}` }; 
  } 
  //Thong ke
  async getUserStats(){
    const total = await this.userRepo.count()
    const admin = await this.userRepo.count({where:{role:'admin'}})
    return {total,admin}
  }
  //Tim theo email  
  async findByEmail(email:string) :Promise<UserEntity|null>{
    return this.userRepo.findOne({where:{email}})
  }
  //Check email co trung khong (register)
  async isEmailTaken(email:string):Promise<Boolean>{
    const user = await this.findByEmail(email)
    return !!user
  }
}
  
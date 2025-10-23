import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
@Injectable()
export class AuthService {
constructor(private userService:UserService,private jwtService:JwtService){}

//dang ky
async register(data:any){

  //Check email da ton tai hay chx
  const exitstingUser = await this.userService.findByEmail(data.email)
  if(exitstingUser){
    throw new BadRequestException('Email đã được sử dụng')
  }
  
  const hashed= await bcrypt.hash(data.password,10)

  return this.userService.create(({...data,password:hashed}))
}
//Dạng nhap
async login(email:string,password:string){
  const user = await this.userService.findByEmail(email)
  if(!user) throw new UnauthorizedException('User not found')
  const valid = await bcrypt.compare(password,user.password)
  if(!valid)throw new UnauthorizedException('Invalid credentials')
  const payload = {sub:user.id,email:user.email,role:user.role}
  const token = this.jwtService.sign(payload)
  return {access_token:token,user}
}
//Lay profile
async getProfile(userId:number){
  return this.userService.findOne(userId)
}
//Cap nhat profile
async updateProfile(userId:number,dto:UpdateProfileDto){
  if(dto.password){
    dto.password = await bcrypt.hash(dto.password,10)
  }
  return this.userService.update(userId,dto)
}
}

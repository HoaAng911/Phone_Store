import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  //  Lấy tất cả user
  findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  //  Lấy 1 user theo id
  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user có id = ${id}`);
    }
    return user;
  }

  //  Tạo user mới (hash mật khẩu nếu có)
  async create(data: CreateUserDto): Promise<UserEntity> {
    const hashPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined
    if (!hashPassword) {
      throw new BadRequestException('Mật khẩu là bắt buộc!')
    }
    const user = this.userRepo.create({
      username:data.username,
      email:data.email,
      role:data.role?? 'user',
      password: hashPassword
    });
    return this.userRepo.save(user);
  }

  //  Cập nhật user 
  async updateUserById(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUserById(id);

 
    if (data.username !== undefined) user.username = data.username
    if (data.email !== undefined) user.email = data.email
    if (data.role !== undefined) {
      if(data.role==='user'||data.role==='admin'){
         user.role = data.role
      }
    }

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10)
    }
    await this.userRepo.save(user)

    return this.userRepo.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    }) as Promise<UserEntity>;
  }

  //  Xóa user
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Không tìm thấy user có id = ${id}`);
    }
    return { message: `Đã xóa user có id = ${id}` };
  }

  //  Thống kê user
  async getUserStats():Promise<{total:number,admin:number}> {
   const [total,admin] = await Promise.all([
    this.userRepo.count(),this.userRepo.count({where:{role:"admin"}})
   ])
   
    return { total, admin };
  }

  //  Tìm theo email
  findByEmailForLogin(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { email } ,
      select:["id","email","password","role","username"]});
  }

  //  Kiểm tra email đã tồn tại chưa
  async isEmailTaken(email: string): Promise<boolean> {
     return await this.userRepo.countBy({email})>0;
   
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  // 🔹 Lấy tất cả user
  findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  // 🔹 Lấy 1 user theo id
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy user có id = ${id}`);
    }
    return user;
  }

  // 🔹 Tạo user mới (hash mật khẩu nếu có)
  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepo.create({
      ...data,
      password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
    });
    return this.userRepo.save(user);
  }

  // 🔹 Cập nhật user
  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    const updatedUser = {
      ...user,
      ...data,
      password: data.password ? await bcrypt.hash(data.password, 10) : user.password,
    };
    return this.userRepo.save(updatedUser);
  }

  // 🔹 Xóa user
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return { message: `Đã xóa user có id = ${id}` };
  }

  // 🔹 Thống kê user
  async getUserStats() {
    const total = await this.userRepo.count();
    const admin = await this.userRepo.count({ where: { role: 'admin' } });
    return { total, admin };
  }

  // 🔹 Tìm theo email
  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  // 🔹 Kiểm tra email đã tồn tại chưa
  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return Boolean(user);
  }
}

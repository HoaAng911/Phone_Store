import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /** Đăng ký tài khoản mới */
  async register(dto: RegisterDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }
    const existingUser = await this.userService.findByEmailForLogin(dto.email);

    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng');
    }

const newUser = await this.userService.create({
    username: dto.username,
    email: dto.email,
    password: dto.password, // create() sẽ tự hash
    // role: 'user' (mặc định trong create)
  });
  const payload ={
    sub:newUser.id,
    email:newUser.email,
    role:newUser.role
  }
  const access_token = this.jwtService.sign(payload);
  return {
    access_token,
    user: newUser,
  };
  }

  /** Đăng nhập và cấp JWT token */
  async login(email: string, password: string) {
    const user = await this.userService.findByEmailForLogin(email);

    if (!user) {
      throw new UnauthorizedException('Không tìm thấy người dùng');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    // Tạo payload chứa thông tin cơ bản
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }

  /** Lấy thông tin cá nhân */
  async getProfile(userId: string) {
    return this.userService.getUserById(userId);
  }

  /** Cập nhật thông tin cá nhân */
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.userService.updateUserById(userId, dto);
  }
}

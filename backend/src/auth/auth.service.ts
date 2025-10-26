import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /** Đăng ký tài khoản mới */
  async register(data: any) {
    const existingUser = await this.userService.findByEmail(data.email);

    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    // Hash mật khẩu trước khi tạo user
    return this.userService.create(data);
  }

  /** Đăng nhập và cấp JWT token */
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

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
  async getProfile(userId: number) {
    return this.userService.findOne(userId);
  }

  /** Cập nhật thông tin cá nhân */
  async updateProfile(userId: number, dto: UpdateProfileDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.userService.update(userId, dto);
  }
}

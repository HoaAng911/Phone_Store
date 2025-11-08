import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /** Tên người dùng */
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  username: string;

  /** Email người dùng */
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  /** Mật khẩu (tùy chọn, vì admin có thể tạo user không cần nhập ngay) */
  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;

  /** Vai trò (mặc định là "user") */
  @IsOptional()
  @IsIn(['user','admin'],{ message: 'Vai trò phải là chuỗi ký tự' })
  role?: 'user'|'admin';
}

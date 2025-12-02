import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: 'Họ tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @IsString({ message: 'Đường phải là chuỗi' })
  @IsNotEmpty({ message: 'Đường không được để trống' })
  street: string;

  @IsString({ message: 'Thành phố phải là chuỗi' })
  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  city: string;

  @IsString({ message: 'Quận phải là chuỗi' })
  @IsNotEmpty({ message: 'Quận không được để trống' })
  district: string;

  @IsString({ message: 'Phường phải là chuỗi' })
  @IsNotEmpty({ message: 'Phường không được để trống' })
  ward: string;

  @IsString()
  @IsOptional()
  country?: string = 'Việt Nam';

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

// src/order/dto/create-order.dto.ts
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AddressInputDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @IsNotEmpty({ message: 'Đường không được để trống' })
  street: string;

  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  city: string;

  @IsNotEmpty({ message: 'Quận không được để trống' })
  district: string;

  @IsNotEmpty({ message: 'Phường không được để trống' })
  ward: string;
}

export class CreateOrderDto {
  @IsEnum(['cart', 'single'], {
    message: 'Type phải là "cart" hoặc "single"',
  })
  type: 'cart' | 'single';

  @IsOptional()
  @IsString()
  addressId?: string;

  @IsOptional()
  @IsObject()
  address?: AddressInputDto;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity?: number;
}
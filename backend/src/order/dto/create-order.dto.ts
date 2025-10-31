// src/order/dto/create-order.dto.ts
import { IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, Min } from 'class-validator';

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
  @IsInt({ message: 'addressId phải là số' })
  addressId?: number;

  @IsOptional()
  @IsObject()
  address?: AddressInputDto;

  @IsOptional()
  @IsInt({ message: 'productId phải là số' })
  @Min(1, { message: 'productId phải lớn hơn 0' })
  productId?: number;

  @IsOptional()
  @IsInt({ message: 'quantity phải là số' })
  @Min(1, { message: 'Số lượng phải ít nhất là 1' })
  quantity?: number;
}
// src/cart/dto/create-cart.dto.ts
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateCartDto {
  // userId do JWT tự động inject → không cần trong DTO
  // Nếu cần: dùng @IsString() + regex

  @IsString({ message: 'productId phải là chuỗi' })
  @Matches(/^\d+$/, { message: 'productId phải là số nguyên dương' })
  @Type(() => String)
  productId: string;

  @IsInt({ message: 'quantity phải là số nguyên' })
  @Min(1, { message: 'quantity phải lớn hơn hoặc bằng 1' })
  @Type(() => Number)
  quantity?: number = 1;
}

// Nếu cần update
export class UpdateCartDto {
   
  @IsString({ message: 'productId phải là chuỗi' })
  @Matches(/^\d+$/, { message: 'productId phải là số nguyên dương' })
  @Type(() => String)
  productId: string;
  @IsOptional()
  @IsInt({ message: 'quantity phải là số nguyên' })
  @Min(1, { message: 'quantity phải lớn hơn hoặc bằng 1' })
  @Type(() => Number)
  quantity?: number;
}
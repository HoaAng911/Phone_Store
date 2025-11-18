import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartDto {
  // UUID v4
  @IsUUID('4', { message: 'productId phải là UUID hợp lệ' })
  productId: string;

  @IsInt({ message: 'quantity phải là số nguyên' })
  @Min(1, { message: 'quantity phải lớn hơn hoặc bằng 1' })
  @IsOptional()
  @Type(() => Number)
  quantity?: number = 1;
}

export class UpdateCartDto {
  @IsUUID('4', { message: 'productId phải là UUID hợp lệ' })
  productId: string;

  @IsOptional()
  @IsInt({ message: 'quantity phải là số nguyên' })
  @Min(1, { message: 'quantity phải lớn hơn hoặc bằng 1' })
  @Type(() => Number)
  quantity?: number;
}

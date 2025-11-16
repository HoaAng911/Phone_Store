// src/product/dto/toggle-flash-sale.dto.ts
import { IsOptional, IsPositive } from 'class-validator';

export class ToggleFlashSaleDto {
  @IsOptional()
  @IsPositive({ message: 'Số giờ phải là số dương' })
  hours?: number;
}
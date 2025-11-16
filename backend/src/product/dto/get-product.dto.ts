// src/products/dto/get-product.dto.ts
import { IsUUID } from 'class-validator';

export class GetProductDto {
  @IsUUID('4', {
    message: 'ID sản phẩm phải là UUID hợp lệ (ví dụ: df1e69ad-...)',
  })
  id: string;
}
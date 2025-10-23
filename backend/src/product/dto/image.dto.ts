// src/product/dto/image.dto.ts
import { IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  url: string;
}

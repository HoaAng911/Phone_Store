// create-product.dto.ts
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCategory } from '../entity/product.entity'; // hoặc để trong file
import { ImageDto } from './image.dto';
import { PhoneSpecificationDto } from './phone-Specification.dto';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Ten san pham la bat buoc' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Mo ta san pham la bat buoc' })
  @IsString()
  description: string;

  @IsNumber({}, { message: 'Gia phai la so' })
  @Min(0, { message: 'Gia khong duoc am' })
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100, { message: 'Khuyen mai toi da 100%' })
  discountPercent?: number;

  @IsNotEmpty({ message: 'Thuong hieu la bat buoc' })
  @IsString()
  brand: string;

  @IsNotEmpty({ message: 'Ma SKU la bat buoc' })
  @IsString()
  sku: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  soldCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  viewCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  reviewCount?: number;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'out_stock'], {
    message: 'Trang thai khong hop le',
  })
  status?: string;

  @IsOptional()
  isFeatured?: boolean;

  @IsEnum(ProductCategory, { message: 'Danh muc khong hop le' })
  @IsNotEmpty({ message: 'Danh muc la bat buoc' })
  category: ProductCategory;

  // Images
  @IsOptional()
  @IsArray({ message: 'Anh phai la mang' })
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  // Specification
  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneSpecificationDto)
  specification?: PhoneSpecificationDto;
}
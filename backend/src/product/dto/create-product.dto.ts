import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ImageDto } from "./image.dto";
import { PhoneSpecificationDto } from "./phone-Specification.dto";

export enum ProductCategory {
  PHONE = 'phone',
  LAPTOP = 'laptop',
  TABLET = 'tablet',
  ACCESSORIES = 'accessories'
}

export class CreateProductDto {
  @IsString({ message: 'Ten san pham la bat buoc' }) name: string;
  @IsString() description: string;
  @IsNumber() @Min(0) price: number;
  @IsOptional() @IsNumber() @Min(0) originalPrice?: number
  @IsOptional() @IsNumber() @Min(0) @Max(100) discountPercent?: number
  @IsString() brand: string;

  @IsOptional() @IsNumber() @Min(0) stock?: number;
  @IsString() sku: string
  @IsOptional() @IsEnum(ProductCategory) category?:ProductCategory

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneSpecificationDto)
  specification?: PhoneSpecificationDto;
}

import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator" 
import {Type} from 'class-transformer'
import { ImageDto } from "./image.dto"

class PhoneSpecificationDto {
  @IsOptional()
  @IsString()
  screenSize?: string
  @IsOptional()
  @IsString()
  resolution?: string
  @IsOptional()
  @IsString()
  cpu?: string
  @IsOptional()
  @IsString()
  ram?: string
  @IsOptional()
  @IsString()
  storage?: string
  @IsOptional()
  @IsString()
  battery?: string
  @IsOptional()
  @IsString()
  os?: string
  @IsOptional()
  @IsString()
  camera?: string
  @IsOptional()
  @IsString()
  sim?: string
  @IsOptional()
  @IsString()
  weight?: string
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[]
}
//createProductDto
export class CreateProductDto {
  @IsString()
  name: string
  @IsString()
  description: string
  @IsNumber()
  price: number
  @IsString()
  brand: string
  @IsNumber()
  stock?: number
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];
  @IsOptional()
  @ValidateNested()
  @Type(()=>PhoneSpecificationDto)
  specification?:PhoneSpecificationDto
}
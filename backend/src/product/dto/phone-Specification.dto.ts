import { IsArray, IsOptional, IsString } from "class-validator";

export class PhoneSpecificationDto {
  @IsOptional() @IsString() screenSize?: string;
  @IsOptional() @IsString() resolution?: string;
  @IsOptional() @IsString() cpu?: string;
  @IsOptional() @IsString() ram?: string;
  @IsOptional() @IsString() storage?: string;
  @IsOptional() @IsString() battery?: string;
  @IsOptional() @IsString() os?: string;
  @IsOptional() @IsString() camera?: string;
  @IsOptional() @IsString() sim?: string;
  @IsOptional() @IsString() weight?: string;
  @IsOptional() 
  @IsArray() 
  @IsString({ each: true }) 
  colors?: string[];
}
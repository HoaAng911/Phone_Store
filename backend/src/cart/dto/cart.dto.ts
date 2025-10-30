import { Type } from "class-transformer"
import { IsInt, Min } from "class-validator"


export class CreateCartDto {
  @IsInt({ message: 'User phai la so nguyen' })
  @Type(() => Number)
  userId: number
  @IsInt({ message: 'User phai la so nguyen' })
  @Type(() => Number)
  productId: number
  @IsInt({ message: 'User phai la so nguyen' })
  @Min(1,{message:"quantity phai lon hon = 1"})
  @Type(() => Number)
  quantity: number
}

export class UpdateCartDto {
  @IsInt({ message: 'User phai la so nguyen' })
  @Type(() => Number)
  userId: number
  @IsInt({ message: 'User phai la so nguyen' })
  @Type(() => Number)
  productId: number
  @IsInt({ message: 'User phai la so nguyen' })
  @Min(1,{message:"quantity phai lon hon = 1"})
  @Type(() => Number)
  quantity: number
}
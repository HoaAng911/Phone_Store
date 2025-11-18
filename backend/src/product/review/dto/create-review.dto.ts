import { IsInt, IsNotEmpty, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
 @IsOptional()
  @IsString()
  comment?: string;
}

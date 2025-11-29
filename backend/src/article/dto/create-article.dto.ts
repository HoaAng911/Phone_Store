import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Tiêu đề là bắt buộc' })
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty({ message: 'Slug là bắt buộc' })
  @IsString()
  @MaxLength(255)
  slug: string;

  @IsNotEmpty({ message: 'Tóm tắt không được để trống' })
  @IsString()
  summary: string;

  @IsNotEmpty({ message: 'Nội dung bài viết là bắt buộc' })
  @IsString()
  content: string;

  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail phải là URL hợp lệ' })
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean = true; // mặc định công khai
}
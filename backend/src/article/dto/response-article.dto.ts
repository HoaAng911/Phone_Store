import { Expose } from 'class-transformer';

export class ArticleResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  summary: string;

  @Expose()
  content: string;

  @Expose()
  thumbnail: string | null;

  @Expose()
  isPublished: boolean;

  @Expose()
  viewCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
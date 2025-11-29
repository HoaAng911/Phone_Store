// src/articles/articles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create({
      ...dto,
      id: uuidv4(), // đảm bảo có id UUID
    });
    return this.articleRepository.save(article);
  }

  async findAll(
    page = 1,
    limit = 10,
    published?: boolean,
  ): Promise<{ data: Article[]; total: number; page: number; limit: number }> {
    const query = this.articleRepository.createQueryBuilder('article');

    if (published !== undefined) {
      query.andWhere('article.isPublished = :published', { published });
    }

    query.orderBy('article.createdAt', 'DESC');
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) throw new NotFoundException('Bài viết không tồn tại');
    return article;
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ slug });
    if (!article) throw new NotFoundException('Bài viết không tồn tại');

    article.viewCount += 1;
    await this.articleRepository.save(article);
    return article;
  }

  async update(id: string, dto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    Object.assign(article, dto);
    return this.articleRepository.save(article);
  }

  async remove(id: string): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Bài viết không tồn tại');
    }
  }
}
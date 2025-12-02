import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product_Review } from './product-review.entity';
import { ProductEntity } from '../entity/product.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserEntity } from '../../user/entity/user.entity';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(Product_Review)
    private readonly reviewRepo: Repository<Product_Review>,

    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}


  async createReview(user: UserEntity, dto: CreateReviewDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại!');
    }

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment?.trim() ?? '',
      user,
      product,
    });

    await this.reviewRepo.save(review);
    await this.updateProductRating(dto.productId);

    return review;
  }


  async getReviews(productId: string) {
    return this.reviewRepo.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  
  async deleteReview(reviewId: string): Promise<void> {
   
    const review = await this.reviewRepo.findOne({
      where: { id: reviewId },
      relations: ['product'],
    });

    if (!review) {
      throw new NotFoundException(`Không tìm thấy đánh giá với id ${reviewId}`);
    }

    const productId = review.product.id;

  
    const result = await this.reviewRepo.delete(reviewId);
    if (!result.affected) {
      throw new BadRequestException('Xóa đánh giá thất bại');
    }

  
    await this.updateProductRating(productId);
  
  }


  private async updateProductRating(productId: string): Promise<void> {
    const result = await this.reviewRepo
      .createQueryBuilder('review')
      .select('COUNT(review.id)', 'count')
      .addSelect('COALESCE(AVG(review.rating), 0)', 'avgRating')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    const reviewCount = Number(result.count);
    const rating = reviewCount === 0 ? 0 : parseFloat(result.avgRating).toFixed(1);

    await this.productRepo.update(productId, {
      reviewCount,
      rating: Number(rating),
    });
  }
}
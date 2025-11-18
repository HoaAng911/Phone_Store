import { Injectable, NotFoundException } from '@nestjs/common';
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
    private reviewRepo: Repository<Product_Review>,

    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) { }

  // Thêm review
  async createReview(user: UserEntity, dto: CreateReviewDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) throw new NotFoundException('Sản phẩm không tồn tại!');

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment?.trim() || "",
      user,
      product,
    });

    await this.reviewRepo.save(review);

    await this.updateProductRating(product.id);

    return review;
  }

  // Tính rating trung bình
  async updateProductRating(productId: string) {
    const reviews = await this.reviewRepo.find({
      where: { product: { id: productId } },
    });

    const totalReviews = reviews.length;
    const avgRating =
      totalReviews === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    await this.productRepo.update(productId, {
      rating: avgRating,
      reviewCount: totalReviews,
    });
  }

  async getReviews(productId: string) {
    return await this.reviewRepo.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}

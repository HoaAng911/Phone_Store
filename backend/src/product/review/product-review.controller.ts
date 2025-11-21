import { Controller, Post, Body, Get, Param, Req, UseGuards, ValidationPipe, Delete } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/jwt.guard';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('reviews')
export class ProductReviewController {
  constructor(private reviewService: ProductReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) dto: CreateReviewDto
  ) {
     console.log("🔎 REQ.USER: ", req.user); 
    const userId = req.user.userId;
  
    return this.reviewService.createReview(userId, dto);
  }

  @Get(':productId')
  getProductReviews(@Param('productId') productId: string) {
    return this.reviewService.getReviews(productId);
  }
  @Delete(':reviewId')
  delete(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }
}

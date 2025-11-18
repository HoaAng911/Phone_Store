import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { ProductImage } from './entity/product-image.entity';
import { PhoneSpecification } from './entity/phone-specification.entity';
import { ProductController } from './product.controller';
import { Product_Review } from './review/product-review.entity';
import { ProductReviewService } from './review/product-review.service';
import { ProductReviewController } from './review/product-review.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ProductImage, PhoneSpecification,Product_Review])],
    controllers: [ProductController,ProductReviewController],
    providers: [ProductService,ProductReviewService],
    exports:[ProductService,ProductReviewService]
})
export class ProductModule { }

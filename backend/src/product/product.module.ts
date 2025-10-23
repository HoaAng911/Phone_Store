import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductImage } from './product-image.entity';
import { PhoneSpecification } from './phone-specification.entity';
import { ProductController } from './product.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ProductImage, PhoneSpecification])],
    controllers: [ProductController],
    providers: [ProductService],
    exports:[ProductService]
})
export class ProductModule { }

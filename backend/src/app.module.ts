import { AddressModule } from './address/address.module';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { ArticleModule } from './article/article.module';
import { ProductReviewService } from './product/review/product-review.service';
import { ProductReviewController } from './product/review/product-review.controller';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { UploadModule } from './uploads/upload.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductEntity } from './product/entity/product.entity';
import { ProductImage } from './product/entity/product-image.entity';
import { PhoneSpecification } from './product/entity/phone-specification.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AddressEntity } from './address/address.entity';
import { CartEntity } from './cart/entity/cart.entity';
import { OrderEntity } from './order/entity/order.entity';
import { OrderItemEntity } from './order/entity/order-item.entity';
import { Product_Review } from './product/review/product-review.entity';
import { Article } from './article/article.entity';
import { ArticlesService } from './article/article.service';
@Module({
  imports: [
    AddressModule,

    CartModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // => http://localhost:3000/uploads/...
    }),
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT') ?? 3306),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [UserEntity, Product_Review, ProductEntity,
          ProductImage, PhoneSpecification, AddressEntity,
          CartEntity, OrderEntity, OrderItemEntity, Article],
        synchronize: true,
      }),
    }),
    UploadModule,
    UserModule,
    AuthModule,
    OrderModule,
    ArticleModule

  ],
  controllers: [
    ProductController, AppController],
  providers: [
    
    AppService],
})
export class AppModule { }

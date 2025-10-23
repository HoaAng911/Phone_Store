import { UploadModule } from './uploads/upload.module';

import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductEntity } from './product/product.entity';
import { ProductImage } from './product/product-image.entity';
import { PhoneSpecification } from './product/phone-specification.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
       
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
        entities: [UserEntity, ProductEntity, ProductImage, PhoneSpecification],
        synchronize: true,
      }),
    }),
     UploadModule,
    UserModule,
    AuthModule,
  
  ],
  controllers: [
    ProductController, AppController],
  providers: [AppService],
})
export class AppModule { }

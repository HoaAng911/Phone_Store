/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entity/cart.entity';
import { CartService } from './cart.service';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { CartController } from './cart.controller';

@Module({
imports: [TypeOrmModule.forFeature([CartEntity,ProductEntity,UserEntity])],
  providers: [CartService],
controllers: [CartController],
  
})
export class CartModule {}

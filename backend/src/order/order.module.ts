import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { OrderEntity } from './entity/order.entity';
import { OrderItemEntity } from './entity/order-item.entity';
import { AddressEntity } from 'src/user/entity/address.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { OrderService } from './order.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProductEntity } from 'src/product/entity/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity,OrderEntity,OrderItemEntity,AddressEntity,CartEntity,UserEntity])],
    controllers: [
        OrderController, ],
    providers: [OrderService],
})
export class OrderModule {}

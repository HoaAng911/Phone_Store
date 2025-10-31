// src/order/order.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post()
  async createOrder(
    @Query('userId', ParseIntPipe) userId: number,
    @Body() dto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(userId, dto);
  }

  
  @Get()
  async getOrdersByUser(@Query('userId', ParseIntPipe) userId: number) {
    return this.orderService.getOrderByID(userId);
  }


  @Get(':id')
  async getOrderDetail(@Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderByID(orderId);
  }
}
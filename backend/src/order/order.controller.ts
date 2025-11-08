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
    @Query('userId', ParseIntPipe) userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(userId, dto);
  }

  
  @Get('my')
  async getOrdersByUserId(@Query('userId', ParseIntPipe) userId: string) {
    return this.orderService.getOrderByID(userId);
  }

@Get()
async getAllOrder(){
  return this.orderService.getAllOrder()
}
  @Get(':id')
  async getOrderDetail(@Param('id', ParseIntPipe) orderId: string) {
    return this.orderService.getOrderByID(orderId);
  }
}
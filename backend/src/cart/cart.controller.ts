/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { CartEntity } from './entity/cart.entity';

@Controller('cart')
export class CartController {
  private logger = new Logger(CartController.name)
  constructor(private readonly cartService: CartService) { }
  @Post(':userId')
  async addToCart(@Param('userId') userId: string, @Body() CreateCartDto: CreateCartDto): Promise<CartEntity> {
    this.logger.log('Them 1 san pham vao gio hang')
    return await this.cartService.addToCart(userId, CreateCartDto)
  }
  @Patch(':userId')
  async updateCartItem(@Param('userId') userId: string, @Body() UpdateCartDto: UpdateCartDto): Promise<CartEntity> {
    return await this.cartService.updateCartItem(userId, UpdateCartDto)
  }
  @Delete(':userId/:productId')
  async removeFormCart(@Param('userId') userId: string, @Param('productId') productId: string): Promise<void> {
    return await this.cartService.removeFromCart(userId, productId)
  }
  @Get(':userId')
  async getCartById(@Param('userId') userId: string): Promise<CartEntity[]> {
    return await this.cartService.getCartByUserId(userId)
  }
  @Get(':userId/total')
  async caculateCartTotal(@Param('userId') userId: string): Promise<{ total: number }> {
    const total = await this.cartService.calculateCartTotal(userId)
    return { total }
  }
  @Delete(':userId')
  async clearCart(@Param('userId') userId: string): Promise<void> {
    return await this.cartService.clearCart(userId)
  }
}

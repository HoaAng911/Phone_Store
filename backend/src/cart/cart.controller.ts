/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { CartEntity } from './entity/cart.entity';

@Controller('cart')
export class CartController {
constructor(private readonly cartService:CartService){}
@Post()
async addToCart(@Body()CreateCartDto:CreateCartDto):Promise<CartEntity>{
return await this.cartService.addToCart(CreateCartDto)
}
@Patch()
async updateCartItem(@Body()UpdateCartDto:UpdateCartDto):Promise<CartEntity>{
return await this.cartService.updateCartItem(UpdateCartDto)
}
@Delete(':userId/:productId')
async removeFormCart(@Param('userId')userId:number,@Param('productId')productId:number):Promise<void>{
return await this.cartService.removeFormCart(userId,productId)
}
@Get(':userId')
async getCartById(@Param('userId') userId:number):Promise<CartEntity[]>{
  return await this.cartService.getCartByUserId(userId)
}
@Get(':userId/total')
async caculateCartTotal (@Param('userId')userId:number):Promise<{total:number}>{
 const total =  await this.cartService.calculateCartTotal(userId)
 return {total}
}
@Delete(':userId')
async clearCart(@Param('userId')userId:number):Promise<void>{
  return await this.cartService.clearCart(userId)
}
}

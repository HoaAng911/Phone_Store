/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entity/cart.entity';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) { }
  private async validateUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');
    return user;
  }
  private async validateProduct(productId: string): Promise<ProductEntity> {
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
    return product;
  }
  private async checkUserAndProduct(userId: string, productId: string): Promise<void> {
    await Promise.all([
      this.validateUser(userId),
      this.validateProduct(productId),
    ]);
  }
  async addToCart(userId: string, createCartDto: CreateCartDto): Promise<CartEntity> {
    try {
      const { productId, quantity, selectedColor } = createCartDto;

      if (!userId || !productId || !selectedColor?.trim()) {
        throw new BadRequestException('Thiếu thông tin sản phẩm: userId, productId, color');
      }
      if (quantity < 1) {
        throw new BadRequestException('Số lượng không hợp lệ');
      }

      // Kiểm tra user
      await this.validateUser(userId);
      // Kiểm tra sản phẩm và lấy chi tiết
       const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['specification'],
    });
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');
      // Kiểm tra màu
      const availableColors = product.specification?.colors || [];
      if (!availableColors.includes(selectedColor)) {
        throw new BadRequestException(`Màu ${selectedColor} không tồn tại cho sản phẩm này`);
      }

      // Kiểm tra giỏ hàng đã có sản phẩm + màu này chưa
      let cartItem = await this.cartRepo.findOne({
        where: { userId, productId, selectedColor }
      });

      if (cartItem) {
        
        cartItem.quantity += quantity;
        cartItem.updatedAt = new Date();
        return await this.cartRepo.save(cartItem);
      } else {
       
        const newCartItem = this.cartRepo.create({
          userId,
          productId,
          quantity,
          selectedColor
        });
        return await this.cartRepo.save(newCartItem);
      }

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi thêm vào giỏ hàng: ' + error.message);
    }
  }

  async updateCartItem(userId: string, updateCartDto: UpdateCartDto): Promise<CartEntity> {
    try {
      const { productId, quantity } = updateCartDto
      //Kiem tra user va product co ton tai hay ko
      this.checkUserAndProduct(userId, productId)
      // Kiem tra gio hang
      const cartItem = await this.cartRepo.findOne({
        where: { userId, productId }
      })
      if (!cartItem) {
        throw new NotFoundException(`San pham voi id ${productId} khong co trong gio hang`)
      }

      if (quantity !== undefined) {
        cartItem.quantity = quantity
      }

      return await this.cartRepo.save(cartItem)
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi cập nhật giỏ hàng: ' + error.message)
    }
  }
  async removeFromCart(userId: string, productId: string): Promise<void> {
    try {
      //Kiem tra user va product
      await this.checkUserAndProduct(userId, productId)
      //Kiem tra gio hang
      const cartItem = await this.cartRepo.findOne({
        where: { userId, productId }
      })
      if (!cartItem) {
        throw new NotFoundException(`San pham voi id ${productId} khong co trong gio hang`)
      }
      //Xoa muc gio hang
      await this.cartRepo.remove(cartItem)
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi xóa sản phẩm khỏi giỏ hàng: ' + error.message);
    }
  }
  async getCartByUserId(userId: string): Promise<CartEntity[]> {
    try {
      //Kiem tra user
      await this.validateUser(userId)
      // Lay gio hang voi san pham
      const cartItems = await this.cartRepo.find({
        where: { userId },
        relations: ['product']
      })
      return cartItems
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi lấy thông tin giỏ hàng: ' + error.message);
    }
  }
  async calculateCartTotal(userId: string): Promise<number> {
    try {
      //Kiem tra user
      await this.validateUser(userId)
      //Lay gio hang voi thong tin san pham
      const cartItems = await this.cartRepo.find({
        where: { userId },
        relations: ['product']
      })
      if (!cartItems || cartItems.length === 0) {
        return 0
      }
      //Tinh tong tien
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
      }, 0)
      return total
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi tính tổng giỏ hàng: ' + error.message);

    }
  }
  async clearCart(userId: string): Promise<void> {
    try {
      await this.validateUser(userId)
      await this.cartRepo.delete({ userId })
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi khi xóa toàn bộ giỏ hàng: ' + error.message);
    }

  }
}

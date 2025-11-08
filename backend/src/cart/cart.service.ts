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
      console.log('userId:', userId);
      console.log('createCartDto:', createCartDto);
      const { productId, quantity } = createCartDto

      if (!userId || !productId || quantity == null || quantity < 1) {
        throw new BadRequestException('Du lieu khong hop le: UserId,ProductId,quantity')
      }
      //Kiem tra user va product ton tai
      await this.checkUserAndProduct(userId, productId)
      //Check xem san pham da co trong gio hang chua
      const existingCartItem = await this.cartRepo.findOne({
        where: { userId, productId }
      })
      if (existingCartItem) {
        //Tang so luong neu san pham ton tai
        existingCartItem.quantity = quantity
        return this.cartRepo.save(existingCartItem)
      }
      //Tao moi neu chua co
      const cartItem = this.cartRepo.create({ userId, productId, quantity })
      return this.cartRepo.save(cartItem)
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
      await this.checkUserAndProduct(userId, productId)
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

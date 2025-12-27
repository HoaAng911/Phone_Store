/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entity/order-item.entity';
import { AddressEntity } from 'src/address/address.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepo: Repository<OrderItemEntity>,

    @InjectRepository(AddressEntity)
    private readonly addressRepo: Repository<AddressEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) { }

  async createOrder(userId: string, dto: CreateOrderDto): Promise<OrderEntity> {
    // 1. Kiểm tra loại đơn
    if (!['cart', 'single'].includes(dto.type)) {
      throw new BadRequestException('Type phải là "cart" hoặc "single"');
    }

    // 2. Xử lý địa chỉ
    let address: AddressEntity;
    if (dto.addressId) {
      const found = await this.addressRepo.findOne({
        where: { id: dto.addressId, user: { id: userId } },
      });
      if (!found) throw new NotFoundException('Địa chỉ không tồn tại');
      address = found;
    } else if (dto.address) {
      const newAddress = this.addressRepo.create({
        ...dto.address,
        user: { id: userId },
      });
      address = await this.addressRepo.save(newAddress);
    } else {
      throw new BadRequestException('Cần addressId hoặc thông tin địa chỉ');
    }

    // 3. Tạo items + tính tiền
    const orderItems: OrderItemEntity[] = [];
    let totalPrice = 0;

    // ==================== ĐẶT HÀNG TỪ GIỎ HÀNG ====================
    if (dto.type === 'cart') {
      const cartItems = await this.cartRepo.find({
        where: { user: { id: userId } },
        relations: ['product'],
      });

      if (cartItems.length === 0) {
        throw new BadRequestException('Giỏ hàng trống');
      }

      for (const item of cartItems) {
        const orderItem = this.orderItemRepo.create({
          product: item.product,
          quantity: item.quantity,
          price: Number(item.product.price),
        });
        orderItems.push(orderItem);
        totalPrice += Number(item.product.price) * item.quantity;
      }

      // Xóa giỏ hàng sau khi đặt thành công
      await this.cartRepo.delete({ user: { id: userId } });
    }

    // ==================== MUA LẺ (SINGLE) ====================
    if (dto.type === 'single') {
      if (!dto.productId || !dto.quantity) {
        throw new BadRequestException('Cần productId và quantity');
      }

      const product = await this.productRepo.findOne({
        where: { id: dto.productId },
      });
      if (!product) throw new NotFoundException('Sản phẩm không tồn tại');

      const orderItem = this.orderItemRepo.create({
        product,
        quantity: dto.quantity,
        price: Number(product.price), // ÉP KIỂU – FIX LỖI!
      });
      orderItems.push(orderItem);
      totalPrice = Number(product.price) * dto.quantity; // ÉP KIỂU
    }

    // 4. Tạo và lưu đơn hàng
    const order = this.orderRepo.create({
      user: { id: userId },
      address,
      totalPrice,
      status: 'pending',
      items: orderItems,
    });

    const savedOrder = await this.orderRepo.save(order);
    return savedOrder;
  }

  // LẤY DANH SÁCH ĐƠN HÀNG CỦA USER
  async getOrderByID(userId: string): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product', 'address'], // SỬA: items.product (không phải item.product)
      order: { createdAt: 'DESC' },
    });
  }

  // LẤY TẤT CẢ ĐƠN HÀNG (ADMIN)
  async getAllOrder(): Promise<OrderEntity[]> {
    return this.orderRepo.find({
      relations: ['items', 'items.product', 'address', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
  async getOrderDetail(orderId: string): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product', 'address', 'user'],
    });

    if (!order) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    return order;
  }
}
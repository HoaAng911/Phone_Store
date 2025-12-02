// src/address/address.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { UserEntity } from '../user/entity/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepo: Repository<AddressEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // Lấy tất cả địa chỉ của user, sắp xếp theo mặc định
  async getAddresses(userId: string) {
    return this.addressRepo.find({
      where: { user: { id: userId } },
      order: { isDefault: 'DESC' },
    });
  }

  // Lấy chi tiết địa chỉ theo id và user
  async getById(id: string, userId: string) {
    const address = await this.addressRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!address) throw new NotFoundException('Không tìm thấy địa chỉ');
    return address;
  }

  // Tạo địa chỉ mới
  async createAddress(userId: string, dto: CreateAddressDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User không tồn tại');

    // Nếu isDefault = true, bỏ mặc định các địa chỉ khác
    if (dto.isDefault) {
      await this.addressRepo.update(
        { user: { id: userId } },
        { isDefault: false },
      );
    }

    const address = this.addressRepo.create({ ...dto, user });
    return this.addressRepo.save(address);
  }

  // Cập nhật địa chỉ
  async updateAddress(id: string, userId: string, dto: UpdateAddressDto) {
    const address = await this.getById(id, userId);

    // Nếu set địa chỉ mặc định
    if (dto.isDefault === true) {
      await this.addressRepo.update(
        { user: { id: userId } },
        { isDefault: false },
      );
    }

    Object.assign(address, dto);
    return this.addressRepo.save(address);
  }

  // Xóa địa chỉ
  async deleteAddress(id: string, userId: string) {
    const address = await this.getById(id, userId);
    return this.addressRepo.remove(address);
  }
}

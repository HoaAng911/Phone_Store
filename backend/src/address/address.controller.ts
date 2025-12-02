// src/address/address.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  
  @Get('user/:userId')
  getAddresses(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.addressService.getAddresses(userId);
  }

 
  @Get(':id/user/:userId')
  getAddressById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.addressService.getById(id, userId);
  }


  @Post('user/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createAddress(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: CreateAddressDto,
  ) {
    return this.addressService.createAddress(userId, dto);
  }


  @Put(':id/user/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateAddress(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(id, userId, dto);
  }


  @Delete(':id/user/:userId')
  deleteAddress(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.addressService.deleteAddress(id, userId);
  }
}

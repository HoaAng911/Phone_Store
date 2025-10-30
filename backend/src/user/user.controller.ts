import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  Lấy tất cả user
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  //  Lấy thống kê (tổng số user, số admin)
  @Get('stats')
  getStats() {
    return this.userService.getUserStats();
  }

  //  Lấy chi tiết 1 user theo ID
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  //  Tạo user mới
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  //  Cập nhật user
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return this.userService.update(id, data);
  }

  //  Xóa user
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}

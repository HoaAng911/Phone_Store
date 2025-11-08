import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/jwt.guard';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('users')

export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.userService.findAll();
  }
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  getStats() {
    return this.userService.getUserStats();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getUserById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) data: CreateUserDto) {
    return this.userService.create(data);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUserById(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, data);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(id);
  }
}

// src/product/product.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ToggleFlashSaleDto } from './dto/toggleFlashSale.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // === [POST] TẠO SẢN PHẨM ===
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // === [GET] DANH MỤC HIỆN CÓ ===
  @Get('categories')
  getAllCategories() {
    return this.productService.getAllCategoryNow();
  }

  // === [GET] SẢN PHẨM THEO DANH MỤC ===
  @Get('category/:category')
  getByCategory(@Param('category') category: string) {
    return this.productService.getProductsByCategory(category);
  }

  // === [GET] SẢN PHẨM NỔI BẬT ===
  @Get('featured')
  getFeatured(@Query('limit') limit = 8) {
    return this.productService.getFeaturedProducts(limit);
  }

  // === [GET] ƯU ĐÃI SỐC ===
  @Get('flash-sale')
  getFlashSale(@Query('limit', new ParseIntPipe({ optional: true })) limit = 6) {
    return this.productService.getFlashSale(limit);
  }

  // === [GET] CHI TIẾT SẢN PHẨM ===
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException(`Không tìm thấy sản phẩm ID: ${id}`);
    return product;
  }

  // === [GET] TẤT CẢ SẢN PHẨM (FILTER) ===
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  // === [GET] THỐNG KÊ ===
  @Get('stats')
  getProductStat() {
    return this.productService.getProductStat();
  }

  // === [PATCH] CẬP NHẬT SẢN PHẨM ===
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  // === [PATCH] BẬT/TẮT FLASH SALE ===
  @Patch(':id/flash-sale')
  async toggleFlashSale(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ToggleFlashSaleDto,
  ) {
    return this.productService.toggleFlashSale(id, dto.hours);
  }

  // === [DELETE] XÓA SẢN PHẨM ===
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productService.remove(id);
  }
}
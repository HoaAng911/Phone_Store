import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   *  Tạo sản phẩm mới
   */
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  /**
   *  Lấy thống kê sản phẩm
   */
  @Get('stats')
  getProductStat() {
    return this.productService.getProductStat();
  }

  /**
   * Lấy danh sách sản phẩm (có phân trang, lọc, tìm kiếm)
   */
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  /**
   *  Lấy chi tiết 1 sản phẩm theo ID
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productService.findOne(id);
  }

  /**
   *  Cập nhật sản phẩm
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  /**
   *  Xóa sản phẩm
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productService.remove(id);
  }
}

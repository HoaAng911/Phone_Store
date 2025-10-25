/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';


@Controller('products')
export class ProductController {
  constructor(private readonly  productService:ProductService){}

//Tao san pham
@Post()
create(@Body() dto: CreateProductDto) {
  return this.productService.create(dto);
}

@Get('stats')
getProductStat(){
  return this.productService.getProductStat()
}
@Get()
findAll(@Query()query:ProductQueryDto){
  return this.productService.findAll(query)
}
@Get(':id')
findOne(@Param('id') id:number){
  return this.productService.findOne(id)
}
@Patch(':id')
update(@Param('id') id:number,@Body()dto:UpdateProductDto){
  return this.productService.update(id,dto)
}
@Delete(':id')
remove(@Param('id')id:number){
  return this.productService.remove(id)
}
}

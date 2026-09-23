import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import UserGuardDto from '../users/dto/user-guard.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto, @Req() request) {
    const user: UserGuardDto = request.user
    createProductDto.user = user
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto, @Req() request) {
    const user: UserGuardDto = request.user;
    updateProductDto.user = user;
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Req() request) {
    const user : UserGuardDto = request.user
    return this.productsService.remove(id, user);
  }
}

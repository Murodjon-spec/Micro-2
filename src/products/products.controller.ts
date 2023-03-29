import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly httpService: HttpService,
  ) { }

  @Post(':id/like')
  async likeBoss(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(+id);
      if (!product) throw new BadRequestException('Product not found');
      this.httpService
        .post(`http://localhost:3000/api/products/${id}/like`, {})
        .subscribe(res => console.log(res));
      return this.productsService.update(+id, { likes: product.likes + 1 });
    } catch (error) {
      console.log(error);
    }
  }

  @EventPattern('product_created')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return products;
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @EventPattern('product_updated')
  async update(@Body() updateProductDto: UpdateProductDto) {
    const { id, ...updateData } = updateProductDto;
    return this.productsService.update(id, updateData);
  }

  @EventPattern('product_deleted')
  async remove(id: string) {
    return this.productsService.remove(+id);
  }
}

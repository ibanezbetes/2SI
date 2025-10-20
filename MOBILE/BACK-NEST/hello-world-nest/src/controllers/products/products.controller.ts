import { Controller, Body, Post, Param, Put, Delete, Get } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.productsService.findOne(numberId);
  }

  /*@Post()
  create(@Body() payload: any) {
    return {
      message: 'acción de crear',
      payload,
    };
  }*/

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  /*@Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }*/

  @Put(':id')
  update(@Param('id') id: string,
    @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  // 🔹 DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    const numericId = Number(id);
    return this.productsService.delete(numericId);
  }
}


import { Controller, Get, Param, Body, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `productId: ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Accion de crear',
      payload,
    };
  }

  @Get('saludar')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('listarProductos')
  getProductos(): string {
    return this.appService.getProductos();
  }
}

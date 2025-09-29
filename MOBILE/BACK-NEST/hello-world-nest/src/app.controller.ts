import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("productos")
  getProductos(): string {
    return this.appService.getProductos();
  }
  @Get("saludar")
  getHello(): string {
    return this.appService.getHello();
  }
}

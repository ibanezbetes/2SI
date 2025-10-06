import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesService } from './services/categories/categories.service';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController],
  providers: [AppService, CategoriesService, ProductsService],
})
export class AppModule {}

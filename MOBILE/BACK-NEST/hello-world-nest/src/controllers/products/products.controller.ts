import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Post()
    create(@Body() payLoad: any) {
        return 'This action adds a new product';
    }
}

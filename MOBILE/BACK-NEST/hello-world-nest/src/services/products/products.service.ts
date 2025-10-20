import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product';

@Injectable()
export class ProductsService {
    private counterId = 1;
    private products: Product[] = [
        {
            id: 1,
            name: 'Producto 1',
            description: 'lorem lorem',
            price: 10000,
            stock: 300,
            image: 'https://i.imgur.com/U4iGx1j.jpeg',
        },
    ];

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        return this.products.find(item => item.id === id);
    }

    create(payload: CreateProductDto) {
        this.counterId += 1;
        const newProduct = {
            id: this.counterId,
            ...payload
        };
        this.products.push(newProduct);
        return newProduct;
    }

    delete(id: number) {
        const productFound = this.products.findIndex((item) => item.id === id);
        if (productFound > 0) {
            this.products.splice(productFound, 1);
        }
    }
    
    update(id: number, payload: UpdateProductDto) {
        const productFound = this.findOne(id);
        if (productFound != null) {
            const index = this.products.findIndex((item) => item.id === id);
            this.products[index] = {
                ...productFound,
                ...payload,
            }
        }
    }
}

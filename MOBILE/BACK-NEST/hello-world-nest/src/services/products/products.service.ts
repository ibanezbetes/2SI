import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

    delete(id: number) {
 const productFound = this.products.findIndex((item) => item.id === id);
 if (productFound > 0) {
 this.products.splice(productFound, 1);
 }
}
update(id: number, payload: any) {
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


import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!' + 'Iñigoat';
  }

  getProductos(): string {
    return 'Listar productos';
  }
}

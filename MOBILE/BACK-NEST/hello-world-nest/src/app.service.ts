import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Se ha entendido Don Jesúh??';
  }
  getProductos(): string {
    return 'Uno pequeño de tortilla.';
  }
}

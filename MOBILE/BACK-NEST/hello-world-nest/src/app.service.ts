import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    //@Inject('PGA') private readonly client:Client,
    ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getProductos(): string {
    return 'Listar productos';
  }


}

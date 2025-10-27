import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('PGA') private readonly client:Client,
    ) {}
  getHello(): string {
    return 'Hello World!' + 'Iñigoat';
  }

  getProductos(): string {
    return 'Listar productos';
  }

  async getPeliculas() {
    const { rows } = await this.client.query('SELECT * FROM PELICULAS');
    return rows;
  }
}

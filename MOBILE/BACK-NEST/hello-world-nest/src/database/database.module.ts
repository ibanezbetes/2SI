import { Module } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'database-1.cf2ag284yovc.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'lucaslucas',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Acepta certificados autofirmados
      },
  });
  client.connect();
  client.query('SELECT * FROM PELICULAS', (err, res) => {
    console.error(err);
    console.log(res.rows);
  });

@Module({})
export class DatabaseModule {}

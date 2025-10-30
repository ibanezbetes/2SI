import { Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/*const client = new Client({
    user: 'postgres',
    host: 'database-1.cf2ag284yovc.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'lucaslucas',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Acepta certificados autofirmados
      },
  });*/
  /*client.connect();
  client.query('SELECT * FROM PELICULAS', (err, res) => {
    console.error(err);
    console.log(res.rows);
  });*/

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath:
        process.env.NODE_ENV === 'prod'
          ? '.prod.env'
          : process.env.NODE_ENV === 'stg'
          ? '.stg.env'
          : '.env',
    }),
    // TypeORM desde config (dev: synchronize=true; prod: false)
TypeOrmModule.forRootAsync({
inject: [config.KEY],
useFactory: (cfg: ConfigType<typeof config>) => {
const { postgres } = cfg;
return {
type: 'postgres',
host: postgres.host,
port: postgres.port,
username: postgres.user,
password: postgres.password,
database: postgres.dbName,
synchronize: true,
autoLoadEntities: true,
ssl: { rejectUnauthorized: false }, // Acepta certificados autofirmados
// logging: true,
};
},
}),
  ],
  providers: [],
  exports: [TypeOrmModule],
})  

export class DatabaseModule {}

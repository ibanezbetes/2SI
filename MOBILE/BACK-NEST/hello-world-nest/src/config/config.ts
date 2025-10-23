import { registerAs } from '@nestjs/config';


export default registerAs('config', () => ({
  postgres: {
    dbName: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
}));

// COMO SI FUERA UNA CLASE ESTÁTICA QUE NOS DA 
// ACCESO A VARIABLES GLOBALES
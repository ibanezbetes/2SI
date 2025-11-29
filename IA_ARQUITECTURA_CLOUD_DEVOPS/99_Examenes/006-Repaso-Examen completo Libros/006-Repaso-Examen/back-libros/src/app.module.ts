import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LibrosModule } from './libros/libros.module';

@Module({
  imports: [DatabaseModule, LibrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

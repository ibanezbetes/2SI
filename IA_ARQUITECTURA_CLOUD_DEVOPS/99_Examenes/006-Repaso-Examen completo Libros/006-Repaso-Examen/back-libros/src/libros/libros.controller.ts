import { Controller, Get, Post } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Body } from '@nestjs/common/decorators';
import { CreateLibroDto } from './dtos/create-libro.dtos';

@Controller('libros')
export class LibrosController {
    constructor(
        private  LibroService: LibrosService
    ) {}

    @Get()
    findall(){
        return this.LibroService.findall();
    }
    @Post()
    create(@Body() createLibroDto: CreateLibroDto){
        return this.LibroService.create(createLibroDto);
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from 'src/dtos/create.pelicula.dto';

@Controller('peliculas')
export class PeliculasController {

    constructor(
        private peliculasService: PeliculasService,
    ) {}

    @Get()
    findAll() {
        return this.peliculasService.findAll();
    }

    @Post()
    create(@Body() createPeliculaDto: CreatePeliculaDto) {
        return this.peliculasService.create(createPeliculaDto);
    }

}

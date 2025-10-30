import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { Repository } from 'typeorm';
import { CreatePeliculaDto } from 'src/peliculas/dto/create-pelicula.dto';

@Injectable()
export class PeliculasService {
    constructor(
        @InjectRepository(Pelicula)
        private readonly repo: Repository<Pelicula>,
    ) {}

    findAll() {
        return this.repo.find();
    }
    async create(createPeliculaDto: CreatePeliculaDto) {
        const nuevaPelicula = this.repo.create(createPeliculaDto);
        return this.repo.save(nuevaPelicula);
    }
}

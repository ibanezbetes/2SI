import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLibroDto } from './dtos/create-libro.dtos';
import { Libro } from './entities/libro.entity';

@Injectable()
export class LibrosService {
    constructor(
        @InjectRepository(Libro)
        private readonly repo: Repository<Libro>
    ){}

    findall(){
        return this.repo.find();
    }
    async create(createLibroDto: CreateLibroDto){
        const nuevoLibro= this.repo.create(createLibroDto);
        return this.repo.save(nuevoLibro);
    }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libro.dtos';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {}
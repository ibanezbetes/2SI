import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'libros' })
export class Libro {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'titulo' })
  titulo: string;

  @Column({ type: 'text', nullable: true, name: 'autor' })
  autor?: string;

  @Column({ type: 'integer', nullable: true, name: 'paginas' })
  paginas?: number;

  @Column({ type: 'text', nullable: true, name: 'fecha_publicacion' })
  fecha_publicacion?: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt?: Date;
}

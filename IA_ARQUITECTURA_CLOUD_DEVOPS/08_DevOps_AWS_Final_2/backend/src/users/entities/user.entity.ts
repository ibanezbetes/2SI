import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  specialty: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarKey: string;

  @OneToMany(() => Item, (item) => item.user)
  items: Item[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  itemId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @CreateDateColumn()
  createdAt: Date;
}

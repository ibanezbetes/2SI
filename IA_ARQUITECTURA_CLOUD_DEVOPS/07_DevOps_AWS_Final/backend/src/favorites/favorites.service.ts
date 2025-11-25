import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(userId: string, createFavoriteDto: CreateFavoriteDto) {
    const existing = await this.favoritesRepository.findOne({
      where: { userId, itemId: createFavoriteDto.itemId },
    });

    if (existing) {
      throw new ConflictException('Item already in favorites');
    }

    const favorite = this.favoritesRepository.create({
      userId,
      itemId: createFavoriteDto.itemId,
    });
    return this.favoritesRepository.save(favorite);
  }

  async findAll(userId: string) {
    return this.favoritesRepository.find({
      where: { userId },
      relations: ['item'],
    });
  }

  async remove(userId: string, itemId: string) {
    const favorite = await this.favoritesRepository.findOne({
      where: { userId, itemId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.favoritesRepository.remove(favorite);
  }
}

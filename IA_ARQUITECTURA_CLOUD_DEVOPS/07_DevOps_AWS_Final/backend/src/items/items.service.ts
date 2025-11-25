import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDto } from './dto/query-items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    // TODO: Get userId from auth/context. For now, using a demo userId.
    const demoUserId = 'demo-user-id'; 
    const item = this.itemsRepository.create({
      ...createItemDto,
      userId: demoUserId,
    });
    return this.itemsRepository.save(item);
  }

  async findAll(query: QueryItemsDto) {
    const { page = 1, limit = 10, q, category, minPrice, maxPrice, sort, order } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.itemsRepository.createQueryBuilder('item');

    if (q) {
      queryBuilder.andWhere('(item.title ILIKE :q OR item.description ILIKE :q)', { q: `%${q}%` });
    }

    if (category) {
      queryBuilder.andWhere('item.category = :category', { category });
    }

    if (minPrice) {
      queryBuilder.andWhere('item.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('item.price <= :maxPrice', { maxPrice });
    }

    queryBuilder.orderBy(`item.${sort}`, order);
    queryBuilder.skip(skip).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }
}

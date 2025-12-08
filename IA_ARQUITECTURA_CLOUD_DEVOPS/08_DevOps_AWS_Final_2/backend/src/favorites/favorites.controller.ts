import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('favorites')
@Controller()
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('favorites')
  @ApiOperation({ summary: 'Get favorites for the current (demo) user' })
  async findAll() {
    const user = await this.usersService.findDemoUser();
    return this.favoritesService.findAll(user.id);
  }

  @Post('favorites/:itemId')
  @ApiOperation({ summary: 'Add item to favorites' })
  async create(@Param('itemId') itemId: string) {
    const user = await this.usersService.findDemoUser();
    return this.favoritesService.create(user.id, { itemId });
  }

  @Delete('favorites/:itemId')
  @ApiOperation({ summary: 'Remove item from favorites' })
  async remove(@Param('itemId') itemId: string) {
    const user = await this.usersService.findDemoUser();
    return this.favoritesService.remove(user.id, itemId);
  }
}

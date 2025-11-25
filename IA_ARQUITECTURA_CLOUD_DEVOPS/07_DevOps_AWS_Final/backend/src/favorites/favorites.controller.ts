import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('users/:id/favorites')
  @ApiOperation({ summary: 'Get favorites for a user' })
  findAll(@Param('id') id: string) {
    return this.favoritesService.findAll(id);
  }

  @Post('favorites/:itemId')
  @ApiOperation({ summary: 'Add item to favorites' })
  create(@Param('itemId') itemId: string) {
    // TODO: Get userId from auth. Using demo user for now.
    const demoUserId = 'demo-user-id';
    return this.favoritesService.create(demoUserId, { itemId });
  }

  @Delete('favorites/:itemId')
  @ApiOperation({ summary: 'Remove item from favorites' })
  remove(@Param('itemId') itemId: string) {
    // TODO: Get userId from auth. Using demo user for now.
    const demoUserId = 'demo-user-id';
    return this.favoritesService.remove(demoUserId, itemId);
  }
}

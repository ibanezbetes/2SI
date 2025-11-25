import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDto } from './dto/query-items.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items with filters' })
  findAll(@Query() query: QueryItemsDto) {
    return this.itemsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }
}

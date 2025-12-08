import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemId: string;
}

import { IsString, IsNumber, IsUrl, MinLength, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsUrl()
  videoUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thumbnailKey: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @Expose({ name: 'name' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose({ name: 'photos' })
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  photos: string;

  @Expose({ name: 'price' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Expose({ name: 'total' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @Expose({ name: 'description' })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

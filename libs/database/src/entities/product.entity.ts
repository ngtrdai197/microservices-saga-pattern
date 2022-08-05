import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
@Exclude()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  @ApiProperty()
  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: 'photos', type: 'text' })
  @ApiProperty()
  @Expose({ name: 'photos' })
  @IsArray()
  @IsNotEmpty()
  photos: string;

  @Column({ name: 'price', type: 'bigint' })
  @ApiProperty()
  @Expose({ name: 'price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Column({ name: 'description', type: 'text' })
  @ApiProperty()
  @Expose({ name: 'description' })
  @IsString()
  @IsOptional()
  description?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

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

  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];
}

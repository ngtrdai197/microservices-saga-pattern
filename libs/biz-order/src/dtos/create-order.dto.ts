import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ArrayMinSize, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @Expose({ name: 'total' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  // TODO: Create custom decorator to validate remaining total of product in inventory
  total: number;

  @Expose({ name: 'user_id' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Expose({ name: 'product_ids' })
  @ApiProperty()
  @ArrayMinSize(1)
  @IsNotEmpty()
  productIds: number[];
}

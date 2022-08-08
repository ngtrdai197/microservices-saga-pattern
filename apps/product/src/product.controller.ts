import { CreateProductDto } from '@app/biz-product/dtos/create-product.dto';
import { ProductEntity } from '@app/database/entities';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: ProductEntity,
  })
  create(@Body() create: CreateProductDto) {
    return this.productService.createProduct(create);
  }
}

import { Injectable } from '@nestjs/common';
import { BizProductService } from 'libs/biz-product/src';
import { CreateProductDto } from 'libs/biz-product/src/dtos/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly bizProductService: BizProductService) {}

  public createProduct(createProductDto: CreateProductDto) {
    return this.bizProductService.create(createProductDto);
  }
}

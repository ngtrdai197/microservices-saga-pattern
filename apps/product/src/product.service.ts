import { BizProductService } from '@app/biz-product';
import { CreateProductDto } from '@app/biz-product/dtos/create-product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly bizProductService: BizProductService) {}

  public createProduct(createProductDto: CreateProductDto) {
    return this.bizProductService.create(createProductDto);
  }
}

import { InventoryEntity } from '@app/database/entities/inventory.entity';
import { ProductEntity } from '@app/database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class BizProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepos: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepos: Repository<InventoryEntity>,
  ) {}

  public async create(dto: CreateProductDto) {
    const product = await this.productRepos.save(this.productRepos.create(dto));
    await this.inventoryRepos.save(
      this.inventoryRepos.create({
        product: product,
        total: dto.total,
      }),
    );
    return product;
  }

  public async findById(productId: number): Promise<ProductEntity | undefined> {
    return this.productRepos.findOne({ id: productId });
  }

  public async findByIds(ids: number[]): Promise<ProductEntity[]> {
    return this.productRepos.findByIds(ids);
  }
}

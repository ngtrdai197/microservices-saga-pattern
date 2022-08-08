import { ProductEntity, UserEntity } from '@app/database/entities';
import { OrderEntity } from '@app/database/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BizOrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepos: Repository<OrderEntity>,
  ) {}

  public async create(dto: {
    total: number;
    products: ProductEntity[];
    user: UserEntity;
  }): Promise<OrderEntity> {
    return await this.orderRepos.save(
      this.orderRepos.create({
        user: dto.user,
        quantity: dto.total,
        products: dto.products,
      }),
    );
  }
}

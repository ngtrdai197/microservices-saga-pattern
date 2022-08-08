import { BizOrderService } from '@app/biz-order';
import { CreateOrderDto } from '@app/biz-order/dtos/create-order.dto';
import { BizProductService } from '@app/biz-product';
import { BizUserService } from '@app/biz-user';
import { KafkaService } from '@app/kafka';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly bizOrderService: BizOrderService,
    private readonly bizProductService: BizProductService,
    private readonly bizUserService: BizUserService,
  ) {}

  public async createOrder(dto: CreateOrderDto) {
    const [products, user] = await Promise.all([
      this.bizProductService.findByIds(dto.productIds),
      this.bizUserService.findById(dto.userId),
    ]);
    if (!products.length || !user) {
      throw new BadRequestException(`Cannot found entity`);
    }
    return this.bizOrderService.create({
      total: dto.total,
      products: products,
      user: user,
    });
  }

  public sendOrder() {
    this.kafkaService.publish('mvc.order.create', {
      quantity: 2,
      total: 55.6,
    });
  }
}

import { BizOrderService } from '@app/biz-order';
import { CreateOrderDto } from '@app/biz-order/dtos/create-order.dto';
import { BizProductService } from '@app/biz-product';
import { BizUserService } from '@app/biz-user';
import { KafkaService } from '@app/kafka';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RejectOrderDto } from '@app/biz-order/dtos/reject-order.dto';
import { plainToInstance } from 'class-transformer';
import { OrderEntity } from '@app/database/entities/order.entity';
import { ORDER_STATUS } from '@app/common/enum';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

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
    // return this.bizOrderService.create({
    //   total: dto.total,
    //   products: products,
    //   user: user,
    // });
    // TODO: test send order to orchestrator
    this.sendOrder();
  }

  public async rejectOrder(dto: RejectOrderDto) {
    this.logger.debug(
      `Reject order ${dto.orderId} with reason: ${dto.rejectReason}`,
    );

    const result = await this.bizOrderService.update(
      plainToInstance(
        OrderEntity,
        {
          id: dto.orderId,
          status: ORDER_STATUS.REJECTED,
        },
        { excludeExtraneousValues: true },
      ),
    );
    return result.affected;
  }

  public sendOrder() {
    this.kafkaService.publish('mvc.order.create', {
      quantity: 2,
      total: 55.6,
    });
  }
}

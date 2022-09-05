import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RejectOrderDto } from '@app/biz-order/dtos/reject-order.dto';
import { OrderService } from './order.service';

@Controller()
export class EventDispatcherController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('mvc.order.rollback')
  public async rejectOrder(@Payload() payload: RejectOrderDto) {
    await this.orderService.rejectOrder(payload);
  }
}

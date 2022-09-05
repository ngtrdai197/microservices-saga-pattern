import { KafkaTopics } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from '../services/order.service';

@Controller()
export class OrderHandler {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern(KafkaTopics.ORDER_CREATED)
  public orderCreated(@Payload() payload: any) {
    this.orderService.createOrder(payload);
  }
}

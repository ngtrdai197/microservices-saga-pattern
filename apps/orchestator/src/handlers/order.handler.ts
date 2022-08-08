import { KafkaTopics } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderHandler {
  @MessagePattern(KafkaTopics.ORDER_CREATED)
  public orderCreated(@Payload() payload: any) {}
}

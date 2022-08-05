import { KafkaService } from '@app/kafka';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly kafkaService: KafkaService) {}

  public sendOrder() {
    this.kafkaService.publish('mvc.order.create', {
      quantity: 2,
      total: 55.6,
    });
  }
}

import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly appService: OrderService) {}

  @Post()
  createOrder() {
    return this.appService.sendOrder();
  }
}

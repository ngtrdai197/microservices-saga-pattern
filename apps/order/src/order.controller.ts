import { CreateOrderDto } from '@app/biz-order/dtos/create-order.dto';
import { OrderEntity } from '@app/database/entities/order.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: OrderEntity,
  })
  createOrder(@Body() createOrder: CreateOrderDto) {
    return this.orderService.createOrder(createOrder);
  }
}

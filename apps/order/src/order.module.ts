import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [KafkaModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

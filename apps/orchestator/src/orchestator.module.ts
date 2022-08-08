import { Module } from '@nestjs/common';
import { OrderHandler } from './handlers/order.handler';

@Module({
  imports: [],
  controllers: [OrderHandler],
  providers: [],
})
export class OrchestatorModule {}

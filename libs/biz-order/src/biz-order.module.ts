import { OrderEntity } from '@app/database/entities/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BizOrderService } from './biz-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [BizOrderService],
  exports: [BizOrderService],
})
export class BizOrderModule {}

import { BizOrderModule } from '@app/biz-order';
import { BizProductModule } from '@app/biz-product';
import { BizUserModule } from '@app/biz-user';
import { DatabaseModule } from '@app/database';
import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'apps/product/src/configuration';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    KafkaModule,
    BizOrderModule,
    BizProductModule,
    BizUserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { OrderHandler } from './handlers/order.handler';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { KafkaModule } from '@app/kafka';
import { OrderService } from './services/order.service';
import { InventoryService } from './services/inventory.service';
import { InventoryHandler } from './handlers/inventory.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    KafkaModule,
  ],
  controllers: [OrderHandler, InventoryHandler],
  providers: [OrderService, InventoryService],
})
export class OrchestratorModule {}

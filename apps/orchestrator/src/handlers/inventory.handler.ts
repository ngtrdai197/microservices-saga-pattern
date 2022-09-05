import { KafkaTopics } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from '../services/inventory.service';

@Controller()
export class InventoryHandler {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern(KafkaTopics.INVENTORY_IS_NOT_ENOUGH)
  public inventoryIsNotEnough(@Payload() payload: any) {
    this.inventoryService.updateInventory(payload.orderId);
  }
}

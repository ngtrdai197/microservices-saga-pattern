import { Injectable } from '@nestjs/common';
import { KafkaService } from '@app/kafka';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { RejectOrderDto } from '@app/biz-order/dtos/reject-order.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly kafkaService: KafkaService) {}

  public updateInventory(orderId: string) {
    /**
     * Assume this method will update the inventory and inventory is not enough
     */
    this.rollbackOrder({ orderId });
  }

  private async rollbackOrder(payload: any) {
    // TODO: Create failure order with reason from inventory service
    const instance = plainToInstance(RejectOrderDto, {
      order_id: payload.orderId,
      reason_reject: 'Inventory is not enough',
    });
    await this.kafkaService.publish(
      'mvc.order.rollback',
      instanceToPlain(instance),
    );
  }
}

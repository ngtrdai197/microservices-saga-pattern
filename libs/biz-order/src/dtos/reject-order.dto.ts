import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RejectOrderDto {
  @Expose({ name: 'order_id' })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @Expose({ name: 'reject_reason' })
  @IsString()
  @IsNotEmpty()
  rejectReason: string;
}

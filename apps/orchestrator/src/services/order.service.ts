import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor() {}

  public async createOrder(payload: any) {
    console.log({ payload });
    /**
     * 1. Create order
     * 2. Send email to user
     * 3. Check inventory
     */
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { BizOrderService } from './biz-order.service';

describe('BizOrderService', () => {
  let service: BizOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BizOrderService],
    }).compile();

    service = module.get<BizOrderService>(BizOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

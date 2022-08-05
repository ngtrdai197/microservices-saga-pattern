import { Test, TestingModule } from '@nestjs/testing';
import { BizProductService } from './biz-product.service';

describe('BizProductService', () => {
  let service: BizProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BizProductService],
    }).compile();

    service = module.get<BizProductService>(BizProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BizUserService } from './biz-user.service';

describe('BizUserService', () => {
  let service: BizUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BizUserService],
    }).compile();

    service = module.get<BizUserService>(BizUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

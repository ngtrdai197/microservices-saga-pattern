import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InternalApiService } from './internal-api.service';

@Controller()
export class InternalApiController {
  constructor(private readonly internalApiService: InternalApiService) {}

  @GrpcMethod('InternalApiService', 'GetHello')
  getHello(): string {
    return this.internalApiService.getHello();
  }
}

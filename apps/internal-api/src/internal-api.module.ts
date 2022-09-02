import { Module } from '@nestjs/common';
import { InternalApiController } from './internal-api.controller';
import { InternalApiService } from './internal-api.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [InternalApiController],
  providers: [InternalApiService],
})
export class InternalApiModule {}

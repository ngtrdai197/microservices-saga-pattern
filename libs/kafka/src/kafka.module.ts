import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}

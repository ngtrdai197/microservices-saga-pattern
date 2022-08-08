import { BizUserModule } from '@app/biz-user';
import { DatabaseModule } from '@app/database';
import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    KafkaModule,
    BizUserModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

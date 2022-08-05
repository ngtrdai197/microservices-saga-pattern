import { DatabaseModule } from '@app/database';
import { UserEntity } from '@app/database/entities';
import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forFeature([UserEntity]),
    KafkaModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

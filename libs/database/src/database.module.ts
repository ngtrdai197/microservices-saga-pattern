import { Constants } from '@app/common';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBLogger } from './db-logger';
import { InventoryEntity, ProductEntity, UserEntity } from './entities';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [UserEntity, ProductEntity, InventoryEntity, OrderEntity],
          synchronize: false,
          entityPrefix: 'tb_',
          logging:
            configService.get('env') === Constants.ENV_DEV ? true : false,
          keepConnectionAlive: true,
          retryDelay: 5000,
          logger: new DBLogger(new Logger()),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}

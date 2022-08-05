import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BizProductModule } from 'libs/biz-product/src';
import configuration from './configuration';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    BizProductModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

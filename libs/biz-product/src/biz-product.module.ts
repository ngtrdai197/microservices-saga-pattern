import { InventoryEntity } from '@app/database/entities/inventory.entity';
import { ProductEntity } from '@app/database/entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BizProductService } from './biz-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, InventoryEntity])],
  providers: [BizProductService],
  exports: [BizProductService],
})
export class BizProductModule {}

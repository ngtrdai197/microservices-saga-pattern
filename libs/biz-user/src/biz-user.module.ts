import { UserEntity } from '@app/database/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BizUserService } from './biz-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [BizUserService],
  exports: [BizUserService],
})
export class BizUserModule {}

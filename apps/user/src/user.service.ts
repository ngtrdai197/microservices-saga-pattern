import { BizUserService } from '@app/biz-user';
import { CreateUserDto } from '@app/biz-user/dtos/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly bizUserService: BizUserService) {}

  public async create(dto: CreateUserDto) {
    return this.bizUserService.create(dto);
  }
}

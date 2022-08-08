import { UserEntity } from '@app/database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class BizUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepos: Repository<UserEntity>,
  ) {}

  public async create(dto: CreateUserDto) {
    return await this.userRepos.save(this.userRepos.create(dto));
  }

  public async findById(userId: number): Promise<UserEntity | undefined> {
    return this.userRepos.findOne({ id: userId });
  }
}

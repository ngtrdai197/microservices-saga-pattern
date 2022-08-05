import { UserEntity } from '@app/database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepos: Repository<UserEntity>,
  ) {}
  create(dto: CreateUserDto) {
    return this.userRepos.save(this.userRepos.create(dto));
  }
}

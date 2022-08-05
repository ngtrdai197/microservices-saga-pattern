import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('mvc.order.create')
  orderCreate(@Payload() message: any) {
    console.log('message :>> ', message);
  }

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(plainToInstance(CreateUserDto, createUser));
  }
}

import { CreateUserDto } from '@app/biz-user/dtos/create-user.dto';
import { UserEntity } from '@app/database/entities';
import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('mvc.order.create')
  orderCreate(@Payload() message: any) {
    console.log('message :>> ', message);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }
}

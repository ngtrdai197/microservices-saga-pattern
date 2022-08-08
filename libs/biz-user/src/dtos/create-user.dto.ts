import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Expose({ name: 'email' })
  @ApiProperty({ name: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose({ name: 'first_name' })
  @ApiProperty({ name: 'first_name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose({ name: 'last_name' })
  @ApiProperty({ name: 'last_name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose({ name: 'password', toClassOnly: true })
  @ApiProperty({ name: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

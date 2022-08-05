import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Expose({ name: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose({ name: 'first_name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose({ name: 'password', toClassOnly: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

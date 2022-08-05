import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
@Unique(['email'])
@Exclude()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar' })
  @Expose({ name: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ name: 'first_name', type: 'varchar' })
  @Expose({ name: 'first_name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  @Expose({ name: 'last_name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ name: 'password' })
  @Expose({ name: 'password', toClassOnly: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

import { IsEmail, IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

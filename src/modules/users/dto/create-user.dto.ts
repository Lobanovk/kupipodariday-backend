import {
  IsEmail,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(2, 200)
  @IsOptional()
  about = 'Пока ничего не рассказал о себе';

  @IsUrl()
  @IsOptional()
  avatar = 'https://i.pravatar.cc/300';

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

import { IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  price = 0;

  @IsString()
  @Length(1, 1024)
  description: string;
}

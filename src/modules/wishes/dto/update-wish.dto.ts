import {IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length} from "class-validator";

export class UpdateWishDto {
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  link: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  image: string;

  @IsNumber()
  @IsOptional()
  price = 0;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;
}

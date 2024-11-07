import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @Max(1500)
  @IsOptional()
  description: string;

  @IsUrl()
  image: string;

  @IsArray()
  itemsId: number[];
}

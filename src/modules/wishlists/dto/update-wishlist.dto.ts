import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Wish } from '../../wishes/entities/wish.entity';

export class UpdateWishlistDto {
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name: string;

  @IsString()
  @Max(1500)
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Wish['id'])
  itemsId: Wish['id'][];
}

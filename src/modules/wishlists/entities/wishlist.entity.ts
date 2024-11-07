import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUrl, Length, Max } from 'class-validator';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Max(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  //TODO - связи
  //items
}

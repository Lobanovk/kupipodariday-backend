import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUrl, Length } from 'class-validator';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  copied: number;

  //TODO - связи
  //owner
  //copied
  //offers
}

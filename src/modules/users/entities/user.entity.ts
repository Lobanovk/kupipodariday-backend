import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, IsUrl, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(2, 30)
  username: string;

  @Column()
  @IsOptional()
  @Length(2, 200)
  about: string;

  @Column()
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  //TODO - описать связи для таблиц
  //wishes
  //offers
  //wishlists
}

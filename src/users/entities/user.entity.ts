import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(2, 30)
  username: string;

  @Column('char', { default: true })
  @Length(2, 200)
  about = 'Пока ничего не рассказал о себе';

  @Column('char', { default: true })
  avatar = 'https://i.pravatar.cc/300';

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  //TODO - описать связи для таблиц
  //wishes
  //offers
  //wishlists
}

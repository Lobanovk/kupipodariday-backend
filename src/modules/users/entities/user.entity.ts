import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional, IsUrl, Length } from 'class-validator';
import { Wish } from 'src/modules/wishes/entities/wish.entity';
import { Wishlist } from 'src/modules/wishlists/entities/wishlist.entity';
import { Offer } from 'src/modules/offers/entities/offer.entity';

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

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}

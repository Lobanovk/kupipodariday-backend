import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

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

  @Column('numeric', { default: 0 })
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column('numeric', { default: 0 })
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  items: Wishlist[];

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesModule } from './modules/wishes/wishes.module';
import { WishlistsModule } from './modules/wishlists/wishlists.module';
import { OffersModule } from './modules/offers/offers.module';
import { User } from './modules/users/entities/user.entity';
import { Offer } from './modules/offers/entities/offer.entity';
import { Wish } from './modules/wishes/entities/wish.entity';
import { Wishlist } from './modules/wishlists/entities/wishlist.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [User, Offer, Wish, Wishlist],
      synchronize: true,
    }),
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

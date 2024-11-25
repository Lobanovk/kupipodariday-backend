import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { User } from 'src/modules/users/entities/user.entity';
import { Offer } from 'src/modules/offers/entities/offer.entity';
import { Wish } from 'src/modules/wishes/entities/wish.entity';
import { Wishlist } from 'src/modules/wishlists/entities/wishlist.entity';
import { WishesModule } from 'src/modules/wishes/wishes.module';
import { WishlistsModule } from 'src/modules/wishlists/wishlists.module';
import { OffersModule } from 'src/modules/offers/offers.module';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';

import configuration from '../configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [User, Offer, Wish, Wishlist],
        synchronize: true,
      }),
    }),
    WishesModule,
    WishlistsModule,
    OffersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

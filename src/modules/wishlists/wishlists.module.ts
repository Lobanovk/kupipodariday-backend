import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsService } from 'src/modules/wishlists/wishlists.service';
import { WishlistsController } from 'src/modules/wishlists/wishlists.controller';
import { Wishlist } from 'src/modules/wishlists/entities/wishlist.entity';
import { Wish } from 'src/modules/wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Wish])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}

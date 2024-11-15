import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from 'src/modules/offers/offers.service';
import { OffersController } from 'src/modules/offers/offers.controller';
import { Offer } from 'src/modules/offers/entities/offer.entity';
import { Wish } from 'src/modules/wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}

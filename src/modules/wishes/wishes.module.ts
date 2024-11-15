import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesService } from 'src/modules/wishes/wishes.service';
import { WishesController } from 'src/modules/wishes/wishes.controller';
import { Wish } from 'src/modules/wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from 'src/modules/offers/entities/offer.entity';
import { CreateOfferDto } from 'src/modules/offers/dto/create-offer.dto';
import { Wish } from 'src/modules/wishes/entities/wish.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create({ offer, user }: { offer: CreateOfferDto; user: User }) {
    // TODO проверка на то, что собранная будет меньше чем после создания заявки
    // TODO на свои подарки нельзя скидыватся

    const currentWish = await this.wishRepository.findOneBy({
      id: offer.itemId,
    });

    const preparedOfferData: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'> = {
      user,
      amount: offer.amount,
      hidden: offer.hidden,
      item: currentWish,
    };

    const newOffer = this.offerRepository.create(preparedOfferData);

    return await this.offerRepository.save(newOffer);
  }

  async findAll() {
    return await this.offerRepository.find({
      relations: {
        user: true,
        item: true,
      },
    });
  }

  async findOne(id: Offer['id']) {
    const currentOffer = await this.offerRepository.findOne({
      where: { id },
      relations: {
        user: true,
        item: true,
      },
    });

    const { item, ...offer } = currentOffer;

    return {
      ...offer,
      item: item.link,
    };
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
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
    const wish = await this.wishRepository.findOne({
      where: {
        id: offer.itemId,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (wish.owner.id === user.id) {
      throw new ConflictException('Вы не можете скидываться на свои подарки');
    }

    const amount = wish.raised + offer.amount;

    if (amount > wish.price) {
      throw new ConflictException(
        'Конечная сумма сбора превышает цену подарка',
      );
    }

    await this.wishRepository.update(wish.id, {
      raised: amount,
    });

    const preparedOfferData: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'> = {
      user,
      amount: offer.amount,
      hidden: offer.hidden,
      item: wish,
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

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Wish } from 'src/modules/wishes/entities/wish.entity';
import { CreateWishDto } from 'src/modules/wishes/dto/create-wish.dto';
import { UpdateWishDto } from 'src/modules/wishes/dto/update-wish.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async create({
    createWishDto,
    user,
  }: {
    createWishDto: CreateWishDto;
    user: User;
  }) {
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner: user,
    });

    return await this.wishRepository.save(wish);
  }

  async findOne(id: Wish['id']) {
    return await this.wishRepository.findOneBy({ id });
  }

  async update({
    user,
    updateWishDto,
  }: {
    updateWishDto: UpdateWishDto & { id: Wish['id'] };
    user: User;
  }) {
    const wish = await this.wishRepository.findOne({
      where: { id: updateWishDto.id },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (wish.owner.id !== user.id) {
      throw new ConflictException(
        'Вы не можете изменять информацию о чужих подарках',
      );
    }

    if (wish.offers.length && updateWishDto.price !== wish.price) {
      throw new ConflictException(
        'Вы не можете изменять цену при созданных заявках на сбор',
      );
    }

    await this.wishRepository.update(updateWishDto.id, updateWishDto);

    return await this.wishRepository.findOneBy({ id: updateWishDto.id });
  }

  async removeOne({ id, user }: { id: Wish['id']; user: User }) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });

    if (wish.owner.id !== user.id) {
      throw new ConflictException('Вы не можете удалять чужие подарки');
    }

    return await this.wishRepository.delete(id);
  }

  async copyOne({ id, user }: { id: Wish['id']; user: User }) {
    const result = await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });

    const { id: _id, ...wish } = result;

    if (wish.owner.id === user.id) {
      throw new ConflictException('Вы не можете копировать свои подарки');
    }

    if (!wish) {
      throw new NotFoundException('No wish found');
    }

    await this.wishRepository.update(id, {
      ...wish,
      copied: Number(wish.copied) + 1,
    });

    const newWish = this.wishRepository.create({
      ...wish,
      raised: 0,
      copied: 0,
      owner: user,
    });

    return await this.wishRepository.save(newWish);
  }

  async findLastCreated() {
    const options: FindManyOptions<Wish> = {
      order: { createdAt: 'DESC' },
      take: 40,
    };

    return await this.wishRepository.findAndCount(options);
  }

  async findVeryCopied() {
    const options: FindManyOptions<Wish> = {
      order: { copied: 'DESC' },
      take: 20,
    };

    return await this.wishRepository.findAndCount(options);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto & { owner: Wish['owner'] }) {
    const user = this.wishRepository.create(createWishDto);

    return await this.wishRepository.save(user);
  }

  async findOne(id: Wish['id']) {
    return await this.wishRepository.findOneBy({ id });
  }

  async update(id: Wish['id'], updateWishDto: UpdateWishDto) {
    await this.wishRepository.update(id, updateWishDto);

    return await this.wishRepository.findOneBy({ id });
  }

  async removeOne(id: Wish['id']) {
    return await this.wishRepository.delete(id);
  }

  async copyOne(id: Wish['id'], ownerId: Wish['owner']) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      select: {
        name: true,
        image: true,
        link: true,
        price: true,
        raised: true,
        description: true,
        copied: true,
        createdAt: true,
      },
    });

    if (!wish) {
      throw new NotFoundException('No wish found');
    }

    await this.wishRepository.update(id, {
      ...wish,
      copied: Number(wish.copied) + 1,
    });

    return await this.create({ ...wish, owner: ownerId });
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

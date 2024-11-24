import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from 'src/modules/wishlists/entities/wishlist.entity';
import { CreateWishlistDto } from 'src/modules/wishlists/dto/create-wishlist.dto';
import { UpdateWishlistDto } from 'src/modules/wishlists/dto/update-wishlist.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { Wish } from 'src/modules/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  private async checkWishListByUser(
    {
      wishListId,
      userId,
    }: {
      wishListId: Wishlist['id'];
      userId: User['id'];
    },
    errorMessage = 'Вы не можете изменять чужие wishlist',
  ) {
    const wishList = await this.wishListRepository.findOne({
      where: { id: wishListId },
      relations: {
        owner: true,
      },
    });

    if (wishList?.owner?.id !== userId) {
      throw new ConflictException(errorMessage);
    }
  }

  async findAll() {
    return await this.wishListRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  async findOne(id: Wishlist['id']) {
    return await this.wishListRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  async create({
    wishList,
    user,
  }: {
    wishList: CreateWishlistDto;
    user: User;
  }) {
    const wishes = await Promise.all(
      wishList.itemsId.map((id) => this.wishRepository.findOneBy({ id: id })),
    );
    const newWishlist = this.wishListRepository.create({
      name: wishList.name,
      description: wishList.description,
      image: wishList.image,
      owner: user,
      items: wishes,
    });

    return await this.wishListRepository.save(newWishlist);
  }

  async update({
    id,
    updateWishListDto,
    user,
  }: {
    id: Wishlist['id'];
    updateWishListDto: UpdateWishlistDto;
    user: User;
  }) {
    await this.checkWishListByUser({ wishListId: id, userId: user.id });

    await this.wishListRepository.update(id, updateWishListDto);

    return await this.wishListRepository.findOneBy({ id });
  }

  async removeOne({ id, user }: { id: Wishlist['id']; user: User }) {
    await this.checkWishListByUser(
      { wishListId: id, userId: user.id },
      'Вы не можете удалять чужие wishlist',
    );
    return await this.wishListRepository.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { WishlistsService } from 'src/modules/wishlists/wishlists.service';
import { CreateWishlistDto } from 'src/modules/wishlists/dto/create-wishlist.dto';
import { UpdateWishlistDto } from 'src/modules/wishlists/dto/update-wishlist.dto';

@Controller('wishlists')
@UseGuards(JwtGuard)
export class WishlistsController {
  constructor(private readonly wishListsService: WishlistsService) {}

  @Get()
  async findAll() {
    return await this.wishListsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.wishListsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: RequestWithUser) {
    return await this.wishListsService.create({
      wishList: createWishlistDto,
      user: req.user,
    });
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return await this.wishListsService.update(Number(id), updateWishlistDto);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    return await this.wishListsService.removeOne(Number(id));
  }
}

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
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

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
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
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

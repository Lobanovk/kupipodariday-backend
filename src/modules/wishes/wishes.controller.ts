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
import { WishesService } from 'src/modules/wishes/wishes.service';
import { CreateWishDto } from 'src/modules/wishes/dto/create-wish.dto';
import { UpdateWishDto } from 'src/modules/wishes/dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createWishDto: CreateWishDto,
  ) {
    try {
      return await this.wishesService.create({
        ...createWishDto,
        owner: req.user,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Param('id') id: string, @Req() req: RequestWithUser) {
    return await this.wishesService.copyOne(Number(id), req.user);
  }

  @Get('last')
  async findLast() {
    return await this.wishesService.findLastCreated();
  }

  @Get('top')
  async findTop() {
    return await this.wishesService.findVeryCopied();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.wishesService.findOne(Number(id));
    } catch (e) {
      throw new Error(e);
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    try {
      return await this.wishesService.update(Number(id), updateWishDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.wishesService.removeOne(Number(id));
    } catch (e) {
      throw new Error(e);
    }
  }
}

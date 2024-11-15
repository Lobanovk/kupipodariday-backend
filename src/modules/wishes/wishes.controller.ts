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
    return await this.wishesService.create({
      createWishDto,
      user: req.user,
    });
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Param('id') id: string, @Req() req: RequestWithUser) {
    return await this.wishesService.copyOne({
      id: Number(id),
      user: req.user,
    });
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
    return await this.wishesService.findOne(Number(id));
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.wishesService.update({
      user: req.user,
      updateWishDto: { ...updateWishDto, id: Number(id) },
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: RequestWithUser) {
    return await this.wishesService.removeOne({
      id: Number(id),
      user: req.user,
    });
  }
}

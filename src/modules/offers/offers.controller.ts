import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../../guards/jwt.guard';

@Controller('offers')
@UseGuards(JwtGuard)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    return await this.offersService.create({
      offer: createOfferDto,
      user: req.user,
    });
  }

  @Get()
  async findAll() {
    return await this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.offersService.findOne(Number(id));
  }
}

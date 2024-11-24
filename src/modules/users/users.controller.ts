import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { FindUserDto } from 'src/modules/users/dto/find-user.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Req() req: RequestWithUser) {
    return await this.usersService.findOne(req.user.id);
  }

  @Patch('me')
  async updateMe(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.findOne(req.user.id);

    return await this.usersService.update(user.id, updateUserDto);
  }

  @Get('me/wishes')
  async findWishes(@Req() req: RequestWithUser) {
    return await this.usersService.findWishesById(req.user.id);
  }

  @Get(':username')
  async findUser(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    const { password, ...result } = user;

    return result;
  }

  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    return await this.usersService.findWishesByUsername(username);
  }

  @Post('find')
  async find(@Body() findUserDto: FindUserDto) {
    return await this.usersService.findByQuery(findUserDto.query);
  }
}

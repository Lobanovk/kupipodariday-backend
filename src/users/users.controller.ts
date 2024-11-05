import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe() {
    console.log('Вернуть информацию о пользаке');
  }

  @Patch('me')
  updateMe(@Body() updateUserDto: UpdateUserDto) {
    console.log('Обновить и вернуть информацию о пользаке', updateUserDto);
  }

  @Get('me/wishes')
  findWishes() {
    console.log('Вернуть информацию о wishes');
  }

  @Get(':username')
  findUser(@Param('username') userName: string) {
    console.log('Вернуть информацию о ', userName);
  }

  @Get(':username/wishes')
  findUserWishes(@Param('username') userName: string) {
    console.log('Вернуть информацию о подарках ', userName);
  }

  @Post('find')
  create(@Body() findUserDto: FindUserDto) {
    console.log('find user ', findUserDto);
  }
}

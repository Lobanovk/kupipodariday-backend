import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findMe() {
    console.log('Вернуть информацию о пользаке');
  }

  @Patch('me')
  updateMe(@Body() updateUserDto: any) {
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
  create(@Body() findUserDto: any) {
    console.log('find user ', findUserDto);
  }
}

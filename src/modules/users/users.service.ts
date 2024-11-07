import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: User['id']): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findByUsername(username: User['username']) {
    return await this.userRepository.findOneBy({ username });
  }

  // findMe() {
  //   return 'This information about me';
  // }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  //
  // findAll() {
  //   return `This action returns all users`;
  // }
  //

  //
  // update(id: number, updateUserDto: any) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

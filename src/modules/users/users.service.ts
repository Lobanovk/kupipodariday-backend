import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: User['id']) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: User['username']) {
    return await this.userRepository.findOneBy({ username });
  }

  async findByUsernameOrEmail(value: User['username'] | User['email']) {
    return await this.userRepository.find({
      where: [{ username: value }, { email: value }],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOneBy({ id });

    const { password, ...result } = user;

    return result;
  }

  async findWishesById(id: User['id']) {
    const result = await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: true,
      },
    });

    return result.wishes;
  }

  async findWishesByUsername(username: User['username']) {
    const result = await this.userRepository.findOne({
      where: { username },
      relations: {
        wishes: true,
      },
    });

    return result?.wishes || [];
  }
}
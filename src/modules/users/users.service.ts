import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

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
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return await this.userRepository.save(user);
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

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

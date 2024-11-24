import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private async findByUsernameOrEmail({
    username,
    email,
  }: {
    username: User['username'];
    email: User['email'];
  }) {
    return await this.userRepository.find({
      where: [{ username }, { email }],
    });
  }

  async findOne(id: User['id']) {
    const result = await this.userRepository.findOneBy({ id });

    if (!result) {
      throw new NotFoundException('Пользователь не найден');
    }

    const { password, ...user } = result;

    return user;
  }

  async findByUsername(username: User['username']) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findWishesById(id: User['id']) {
    const result = await this.userRepository.findOne({
      where: { id },
      relations: {
        wishes: true,
      },
    });

    return result?.wishes || [];
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

  async findByQuery(query: User['email'] | User['username']) {
    const users = await this.findByUsernameOrEmail({
      username: query,
      email: query,
    });

    if (!users.length) {
      throw new NotFoundException('Пользователь не найден');
    }

    const { password, ...user } = users[0];

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
      if (error instanceof QueryFailedError) {
        const err = error.driverError;

        if (err.code === '23505') {
          throw new ConflictException(
            'Пользователь с таким email или username уже существует',
          );
        }
      }
    }
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto) {
    const userExists = await this.findByUsernameOrEmail({
      username: updateUserDto.username,
      email: updateUserDto.email,
    });

    if (userExists.length) {
      throw new ConflictException(
        'Пользователь с таким email или username уже существует',
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);

    return await this.findOne(id);
  }
}

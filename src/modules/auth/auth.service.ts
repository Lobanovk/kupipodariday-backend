import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload, { expiresIn: '7d' }) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}

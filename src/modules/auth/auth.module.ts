import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../../strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../../strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: () => ({ secret: 'some-secret-key' }),
      inject: [],
    }),
  ],
  controllers: [AuthController, LocalStrategy, JwtStrategy],
  providers: [AuthService],
})
export class AuthModule {}

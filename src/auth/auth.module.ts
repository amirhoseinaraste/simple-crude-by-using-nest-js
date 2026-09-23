import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Codes } from 'src/entities/codes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Codes]), JwtModule.register({
    secret: 'your-secret-key', // Replace with your own secret key
    signOptions: { expiresIn: '1h' }, // Token expiration time
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}

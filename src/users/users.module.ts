import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([Users])], // use TypeOrmModule.forFeature to register the Users entity
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard],
})
export class UsersModule {}

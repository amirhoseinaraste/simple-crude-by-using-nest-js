import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<Users | null> {
        return this.usersRepository.findOneBy({ id });
    }

    // Implement the findByEmail method to find a user by email
    async findByEmail(email: string): Promise<Users | null> {
        return this.usersRepository.findOneBy({ email });
    }

    async create(user: createUserDto): Promise<Users> {
        const newUser = this.usersRepository.create(user);
        await this.usersRepository.save(newUser);
        return newUser;
    }
}

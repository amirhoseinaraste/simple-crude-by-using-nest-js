import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.usersService.findOne(id);
    }
}

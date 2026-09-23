import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Codes } from 'src/entities/codes.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { OtpAuthDto } from './dto/otp-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Codes) private readonly codesRepository: Repository<Codes>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService  
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.usersService.findByEmail(registerAuthDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    registerAuthDto.password = await bcrypt.hash(registerAuthDto.password, 10);
    await this.usersService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginAuthDto.email)
    if(!user){
      throw new HttpException('user not found', 404)
    }
    const isPasswordMath = await bcrypt.compare(
      loginAuthDto.password,
      user.password
    );
    if(!isPasswordMath){
      throw new HttpException('Wrong password', 400);
    }

    const accessToken = this.jwtService.sign({ email: user.email, sub: user.id });
    return { accessToken };
    
  }

  async otp(otpaAuthDto: OtpAuthDto) {
    const user = await this.usersService.findByEmail(otpaAuthDto.email);
    if (!user) {
      throw new HttpException('user not found', 404);
    }

    const checkCode = await this.codesRepository.findOne({
      where: {
        code: otpaAuthDto.code,
        email: otpaAuthDto.email,
        is_used: false,
      },
    });

    if (checkCode) {
      const accessToken = this.jwtService.sign({ email: user.email, sub: user.id });
      return { accessToken };
    }

    const otp = await this.generateOtpCode();
    await this.codesRepository.save({
      code: otp,
      email: otpaAuthDto.email,
      is_used: false,
    });
    return { code: otp };
  }

  async generateOtpCode(){
    let code: number | null = null;
    while(!code){
      const fiveDigitCode = await this.getRandomCode()
      const checkCode = await this.codesRepository.findOne({
        where: {
          code: fiveDigitCode
        }
      });
      if(!checkCode){
        code = fiveDigitCode;
      }
    }
    return code
  }
  async getRandomCode(){
    const min = 10000;
    const max = 99999;
    const otp = Math.floor(Math.random() * (max - min + 1))+ min ;
    return otp;
  }

}

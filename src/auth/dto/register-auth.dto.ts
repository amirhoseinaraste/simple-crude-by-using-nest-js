
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsNumber()
    age!: number;

}

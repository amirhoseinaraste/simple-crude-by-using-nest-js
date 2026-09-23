import { IsEmail, IsNotEmpty } from "class-validator";

export class OtpAuthDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    code!:number;
}
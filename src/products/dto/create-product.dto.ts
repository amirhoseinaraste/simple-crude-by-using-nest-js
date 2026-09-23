import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import UserGuardDto from 'src/users/dto/user-guard.dto';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    price!: number;
    
    @IsNotEmpty()
    user!: UserGuardDto; // Add userId property to associate the product with a user
}

import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { TRol } from "src/general/types";

export class CreateUserDto {

    @IsNotEmpty()
    name: string; 

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @IsNotEmpty()
    password: string;
    
    roles: TRol;
}

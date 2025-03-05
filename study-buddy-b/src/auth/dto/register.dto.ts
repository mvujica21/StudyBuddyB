import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword!: string;

    @IsNotEmpty()
    @IsString()
    username!: string;
}
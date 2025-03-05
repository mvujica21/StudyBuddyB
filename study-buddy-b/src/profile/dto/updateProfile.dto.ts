import { IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    username?: string

    @IsOptional()
    @IsStrongPassword()
    @IsString()
    passwordHash?: string

    @IsOptional()
    profilePicture?: Buffer
}
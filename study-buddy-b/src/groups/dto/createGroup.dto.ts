import { IsNumber, IsString } from "class-validator";

export class CreateGroupDto{
    @IsString()
    name!: string
    @IsString()
    description!: string
    @IsNumber()
    createdBy!: number
}
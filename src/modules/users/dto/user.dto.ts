import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @MaxLength(60)
    firstname: string

    @IsNotEmpty()
    @MaxLength(60)
    lastname: string

    @IsNotEmpty()
    @MaxLength(60)
    @IsEmail()
    mail: string

    @IsNotEmpty()
    cedula: string

    @IsNotEmpty()
    telephone: string

    @IsNotEmpty()
    address: string

    @Optional()
    _id?: any
}
import { Optional } from "@nestjs/common";
import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { StatusEnum } from "src/common";

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

    @IsEnum(StatusEnum)
    status: StatusEnum

    @Optional()
    _id?: any
}
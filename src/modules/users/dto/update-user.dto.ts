import { IsEnum } from "class-validator";
import { UserDto } from "./user.dto";
import { StatusEnum } from "src/common";
import { Optional } from "@nestjs/common";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(UserDto) { 
    
    @IsEnum(StatusEnum)
    @Optional()
    status?: StatusEnum
}
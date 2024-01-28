import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { CreateEmployerdto } from "./create-employer.dto";
import { StatusEnum } from "src/common";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateEmployerDto extends PartialType(CreateEmployerdto) { 
    @IsEnum(StatusEnum)
    @IsOptional()
    status?: StatusEnum
    
    @IsOptional()
    _id: string
}

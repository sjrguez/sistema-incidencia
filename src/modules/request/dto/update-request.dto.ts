import { PartialType } from "@nestjs/mapped-types";
import { CreateRequestDto } from "./create-request.dto";
import { StatusRequestEnum } from "../enum/status-request.enum";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateRequestDto extends PartialType(CreateRequestDto) {

    @IsNotEmpty()
    @IsEnum(StatusRequestEnum)
    status: StatusRequestEnum

    _id: string
}
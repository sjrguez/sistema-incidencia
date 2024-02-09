import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusRequestEnum } from "src/common";

export class UpdateStatusRequestDto {
    @IsNotEmpty()
    @IsEnum(StatusRequestEnum)
    status: StatusRequestEnum
}
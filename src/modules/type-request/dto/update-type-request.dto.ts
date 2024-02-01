import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CreateTypeRequestDto } from "./create-type-request.dto";
import { StatusEnum } from "src/common";

enum Status {
    ACTIVE = StatusEnum.ACTIVE,
    INACTIVE = StatusEnum.INACTIVE,
}
export class UpdateTypeRequestDto extends CreateTypeRequestDto{
    @IsEnum(Status)
    @IsNotEmpty()
    @IsOptional()
    status: StatusEnum
}
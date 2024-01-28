import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusEnum } from "src/common";

enum Status {
    ACTIVE = StatusEnum.ACTIVE,
    INACTIVE = StatusEnum.INACTIVE,
}
export class UpdateEmployerStatusDto  { 
    @IsEnum(Status)
    @IsNotEmpty()
    status: StatusEnum
}

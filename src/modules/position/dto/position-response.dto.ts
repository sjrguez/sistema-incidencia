import { StatusEnum } from "src/common";

export class PositionResponseDto {
    name: string;
    superUser: boolean;
    status: StatusEnum;
    _id: string;
}
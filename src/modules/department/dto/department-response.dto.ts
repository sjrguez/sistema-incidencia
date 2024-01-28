import { StatusEnum } from "src/common";

export class DepartmentResponseDto {
    name: string;
    isIT: boolean;
    status: StatusEnum
    _id: string
}
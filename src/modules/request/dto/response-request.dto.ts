import { StatusRequestEnum } from "src/common";
import { DepartmentResponseDto } from "src/modules/department/dto";
import { EmployerResponseDto } from "src/modules/employers/dto";
import { TypeRequestResponseDto } from "src/modules/type-request/dto";

export class ResponseRequestDto {
    issue: string;
    description: string;
    pcName: string;
    telephone: string;
    createAt: Date;
    updateAt: Date;
    dueDate: Date;
    createdBy: EmployerResponseDto;
    department: DepartmentResponseDto;
    typeRequest: TypeRequestResponseDto;
    asignedTo: EmployerResponseDto;
    status: StatusRequestEnum;
    _id: string
}
import { StatusEnum } from "src/common"
import { DepartmentResponseDto } from "../../department/dto/department-response.dto"
import { UserResponseDto } from "src/modules/users/dto"
import { PositionResponseDto } from "src/modules/position/dto"

export class EmployerResponseDto {
    employerCode: string
    username: string
    position: PositionResponseDto
    user: UserResponseDto
    department: DepartmentResponseDto
    status: StatusEnum
    createAt?: Date
    updateAt?: Date
    _id: string
}
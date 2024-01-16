import { StatusEnum } from "src/common"

export class UserResponseDto {
    firstname: string
    lastname: string
    mail: string
    cedula: string
    telephone: string
    address: string
    status: StatusEnum
    _id: string
}
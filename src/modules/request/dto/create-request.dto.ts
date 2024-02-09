import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRequestDto {
    @IsNotEmpty()
    department: string

    @IsNotEmpty()
    typeRequest: string
    
    @IsNotEmpty()
    asignedTo: string

    @IsNotEmpty()
    createdBy: string

    @IsNotEmpty()
    telephone: string

    @IsNotEmpty()
    pcName: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    issue: string

    @IsOptional()
    dueDate: Date
}
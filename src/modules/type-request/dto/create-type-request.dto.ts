import { IsNotEmpty } from "class-validator";

export class CreateTypeRequestDto {
    @IsNotEmpty()
    name: string
}
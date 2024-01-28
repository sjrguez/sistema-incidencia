import { IsNotEmpty, Length } from "class-validator";

export class UpdateEmployerPasswordDto  { 
    @IsNotEmpty()
    @Length(8, 60)
    password: string
}

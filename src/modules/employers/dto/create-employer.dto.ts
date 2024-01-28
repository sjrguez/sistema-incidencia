import { Type } from "class-transformer";
import { IsNotEmpty, Length, MaxLength, ValidateNested } from "class-validator";
import { UserDto } from "src/modules/users/dto";


export class CreateEmployerdto {
    @IsNotEmpty()
    @MaxLength(60)
    username: string

    @IsNotEmpty()
    @Length(8, 60)
    password: string

    @IsNotEmpty()
    employerCode: string

    @IsNotEmpty()
    department: string

    @IsNotEmpty()
    position: string

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto

}
import {  UserResponseDto, UserDto } from "./dto";
import { User } from "./entity/user.schema";

export class UserMapper {

    static toDto(entity: User): UserResponseDto {
        const dto = new UserResponseDto();

        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        dto.mail = entity.mail;
        dto.address = entity.address;
        dto.status = entity.status;
        dto.telephone = entity.telephone;
        dto.cedula = entity.cedula
        dto._id = entity._id
        return dto
    }


    static toCreate(dto: UserDto): User {
        const user = new User()
        user.firstname = dto.firstname
        user.lastname = dto.lastname
        user.mail = dto.mail
        user.telephone = dto.telephone
        user.address = dto.address
        user.status = dto.status
        user.cedula = dto.cedula
        return user;
    }


    static toUpdate(user: Partial<User>, dto: Partial<UserDto>) {
        user.firstname = dto.firstname
        user.lastname = dto.lastname
        user.mail = dto.mail
        user.telephone = dto.telephone
        user.address = dto.address
        user.status = dto.status
        user.cedula = dto.cedula
        return user;
    }
}
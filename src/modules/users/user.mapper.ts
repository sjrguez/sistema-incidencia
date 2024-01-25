import { StatusEnum } from "src/common";
import {  UserResponseDto, UserDto, UpdateUserDto } from "./dto";
import { UserEntity } from "./entity/user.schema";

export class UserMapper {

    static toDto(entity: UserEntity): UserResponseDto {
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


    static toCreate(dto: UserDto): UserEntity {
        const user = new UserEntity()
        user.firstname = dto.firstname
        user.lastname = dto.lastname
        user.mail = dto.mail
        user.telephone = dto.telephone
        user.address = dto.address
        user.status = StatusEnum.ACTIVE
        user.cedula = dto.cedula
        return user;
    }


    static toUpdate(user: Partial<UserEntity>, dto: UpdateUserDto) {
        user.firstname = dto.firstname
        user.lastname = dto.lastname
        user.mail = dto.mail
        user.telephone = dto.telephone
        user.address = dto.address
        user.status = dto.status
        user.cedula = dto.cedula
        user.updateAt = new Date();
        return user;
    }
}
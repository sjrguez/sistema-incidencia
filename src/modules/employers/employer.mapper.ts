import { DepartmentMapper } from "../department/department.mapper";
import { DepartmentEntity } from "../department/entity/department.schema";
import { PositionEntity } from "../position/entity/position.schema";
import { PositionMapper } from "../position/position.mapper";
import { UserEntity } from "../users/entity/user.schema";
import { UserMapper } from "../users/user.mapper";
import { CreateEmployerdto, UpdateEmployerDto, UpdateEmployerPasswordDto, UpdateEmployerStatusDto } from "./dto";
import { EmployerResponseDto } from "./dto/employer-response.dto";
import { EmployerEntity } from "./entity/employer.schema";

export class EmployerMapper {

    static toDto(entity: EmployerEntity): EmployerResponseDto  {
        const dto = new EmployerResponseDto()

        dto._id = entity._id
        dto.employerCode = entity.employerCode
        dto.username = entity.username

        dto.department =  DepartmentMapper.toDto(entity.department)
        dto.position =  PositionMapper.toDto(entity.position)
        dto.user = UserMapper.toDto(entity.user)
        dto.status = entity.status
        if(entity.createAt ) dto.createAt = entity.createAt
        return dto;
    }

    static toCreate(dto: CreateEmployerdto): EmployerEntity {
        const entity = new EmployerEntity();
        entity.department = new DepartmentEntity({_id: dto.department});
        entity.position = new PositionEntity({_id: dto.position});
        entity.employerCode = dto.employerCode;
        entity.password = dto.password;
        entity.username = dto.username;
        entity.user = new UserEntity({_id: dto.user._id});

        return entity
    }

    static toUpdate( dto:UpdateEmployerDto) {
        const entity = new EmployerEntity({_id: dto._id})
        entity.department = new DepartmentEntity({_id: dto.department});
        entity.position = new PositionEntity({_id: dto.position});

        entity.employerCode = dto.employerCode;
        entity.updateAt = new Date();
        entity.username = dto.username;

        return entity
    }

    static toUpdateStatus(dto:UpdateEmployerStatusDto, id: string) {
        const entity = new EmployerEntity({_id: id})
        entity.updateAt = new Date();
        entity.status = dto.status
        return entity;
    }

    static toUpdatePassword( id: string) {
        const entity = new EmployerEntity({_id: id})
        entity.updateAt = new Date();
        return entity;
    }
}
import { DepartmentMapper } from "../department/department.mapper";
import { DepartmentEntity } from "../department/entity/department.schema";
import { EmployerMapper } from "../employers/employer.mapper";
import { EmployerEntity } from "../employers/entity/employer.schema";
import { TypeRequestEntity } from "../type-request/entity/type-request.schema";
import { TypeRequestMapper } from "../type-request/type-request.mapper";
import { UserMapper } from "../users/user.mapper";
import { CreateRequestDto, ResponseRequestDto, UpdateRequestDto, UpdateStatusRequestDto } from "./dto";
import { RequestEntity } from "./entity/request.schema";

export class RequestMapper {

    static toDto(entity: RequestEntity){
        const dto = new ResponseRequestDto()
        dto._id = entity._id
        dto.asignedTo = EmployerMapper.toDto(entity.asignedTo)
        dto.createdBy = EmployerMapper.toDto(entity.createdBy)
        dto.department = DepartmentMapper.toDto(entity.department)
        dto.typeRequest = TypeRequestMapper.toDto(entity.typeRequest)
        
        dto.issue = entity.issue
        dto.description = entity.description
        dto.pcName = entity.pcName
        dto.telephone = entity.telephone
        dto.status = entity.status
        dto.createAt = entity.createAt
        dto.dueDate = entity.dueDate
        return dto;
    }

    static toCreate(dto: CreateRequestDto) {
        const entity = new RequestEntity();

        entity.asignedTo = new EmployerEntity({_id: dto.asignedTo})
        entity.createdBy = new EmployerEntity({_id: dto.createdBy})
        entity.department = new DepartmentEntity({_id: dto.department})
        entity.typeRequest = new TypeRequestEntity({_id: dto.typeRequest})

        if(dto.dueDate) entity.dueDate = dto.dueDate;

        entity.description = dto.description
        entity.telephone = dto.telephone
        entity.pcName = dto.pcName
        entity.issue = dto.issue
        return entity;
    }


    static toUpdate(dto: UpdateRequestDto, id: string) {
        let entity = new RequestEntity({_id: id})

        entity = Object.assign(dto,entity )

        entity.asignedTo = new EmployerEntity({_id: dto.asignedTo})
        entity.createdBy = new EmployerEntity({_id: dto.createdBy})
        entity.department = new DepartmentEntity({_id: dto.department})
        entity.typeRequest = new TypeRequestEntity({_id: dto.typeRequest})
        return entity
    }


    static toUpdateStatus(dto: UpdateStatusRequestDto, id: string) {
        let entity = new RequestEntity({_id: id})

        entity.status = dto.status
        return entity
    }
}
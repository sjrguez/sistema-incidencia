import { compareObjects } from "src/helpers/compareObjects";
import { EmployerEntity } from "../employers/entity/employer.schema";
import { RequestEntity } from "../request/entity/request.schema";
import { CreateHistorialRequestDto } from "./dto/create-historial-request.dto";
import { HistorialRequestEntity } from "./entity/historial-request.schema";
import { ResponseHistorialRequest } from "./dto/responde-historial-request.dto";
import { DepartmentMapper } from "../department/department.mapper";
import { TypeRequestMapper } from "../type-request/type-request.mapper";
import { UserMapper } from "../users/user.mapper";

export class HistorialRequestMapper {
    static toDto(entity: HistorialRequestEntity){
        const dto = new ResponseHistorialRequest()

        dto._id = entity._id;
        dto.accion = entity.accion
        dto.createAt = entity.createAt
        dto.pcName = entity.request.pcName
        dto.charger = `${entity.changer.user.firstname} ${entity.changer.user.lastname}`
        if(entity?.changes) {
            let { asignedTo, department, typeRequest, ...others } = entity.changes.to
            const to: any = {
                ...others,
            }
            if(entity.changes.to.department) to.department = DepartmentMapper.toDto(entity.changes.to.department).name
            if(entity.changes.to.typeRequest) to.typeRequest = TypeRequestMapper.toDto(entity.changes.to.typeRequest).name
            if(entity.changes.to.asignedTo) {
                const user = UserMapper.toDto(entity.changes.to.asignedTo.user)
                to.asignedTo = `${user.firstname} ${user.lastname}`
            }

            const from: any = {}
            for (const name of Object.getOwnPropertyNames(to)) {
                from[name] = entity.changes.from[name]
                if(name === 'asignedTo') {
                    const user = UserMapper.toDto(entity.changes.from.asignedTo.user)
                    from[name] = `${user.firstname} ${user.lastname}`
                }
                if(name === 'department') from[name] = DepartmentMapper.toDto(entity.changes.from.department).name
                if(name === 'typeRequest') from[name] = TypeRequestMapper.toDto(entity.changes.from.typeRequest).name
            }

            dto.changes = {from, to}
        }

        return dto
    }

    static toCreate(dto: CreateHistorialRequestDto) {
        const entity = new HistorialRequestEntity();
        entity.accion = dto.accion
        entity.changer = new EmployerEntity({_id: dto.changer})
        entity.request = new RequestEntity({_id: dto.request})

        if(dto.changes) {
            const obj1 = this.toObject(dto.changes.from)
            const obj2 = this.toObject(dto.changes.to)
            const difference = compareObjects( obj1,obj2)

            entity.changes = {
                to: difference as any,
                from:  dto.changes.from
            }
        }
        return entity
    }


    private static toObject(request: RequestEntity) {
        return {
            department: `${request.department._id ? request.department._id : request.department}`.toString(),
            typeRequest: `${request.typeRequest._id ? request.typeRequest._id : request.typeRequest}`.toString(),
            asignedTo: `${request.asignedTo._id ? request.asignedTo._id : request.asignedTo}`.toString(),
            telephone: request.telephone,
            pcName: request.pcName,
            description: request.description,
            issue: request.issue,
            dueDate: request.dueDate,
            status: request.status
        }
    }
}
import { CreateTypeRequestDto, TypeRequestResponseDto, UpdateTypeRequestDto } from "./dto";
import { TypeRequestEntity } from "./entity/type-request.schema";

export class TypeRequestMapper {

    static toDto (entity: TypeRequestEntity) {
        const dto = new TypeRequestResponseDto();
        dto._id = entity._id;
        dto.name = entity.name
        dto.status = entity.status
        return dto
    }

    static toCreate(dto: CreateTypeRequestDto){ 
        const entity = new TypeRequestEntity();
        entity.name = dto.name
        return entity;
    }

    static toUpdate(dto:UpdateTypeRequestDto, id: string) {
        const entity = new TypeRequestEntity({_id: id})
        entity.name = dto.name;
        entity.updateAt = new Date()
        entity.status = dto.status
        return entity
    }
}
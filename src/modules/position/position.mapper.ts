import { PositionResponseDto } from "./dto";
import { PositionEntity } from "./entity/position.schema";

export class PositionMapper {
    static toDto(entity: PositionEntity) {

        const dto = new PositionResponseDto();
        dto._id = entity._id
        dto.name = entity.name
        dto.superUser = entity.superUser
        return dto;
    }
}
import { CreateFileRequestDto } from "./dto/create-file-request.dto";
import { FileRequestEntity } from "./entity/file-request.schema";

export class FilesRequestMapper {

    static toCreate(dto: CreateFileRequestDto) {
        const entities =  dto.files.map(() => {
            const entity = new FileRequestEntity()
            
            entity.request = dto.request
        })

        return entities
    }

}
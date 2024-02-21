import { RequestEntity } from "src/modules/request/entity/request.schema"

export class CreateFileRequestDto {
    request: RequestEntity
    files: File[]
}
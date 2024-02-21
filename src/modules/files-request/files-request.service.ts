import { Injectable } from '@nestjs/common';
import { FilesRequestRepository } from './files-request.repository';
import { CreateFileRequestDto } from './dto/create-file-request.dto';

@Injectable()
export class FilesRequestService {

    constructor(private fileRequestRepository: FilesRequestRepository){}

    create(dto: CreateFileRequestDto, opts = {}){ 
        
    }
}

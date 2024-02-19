import { Injectable } from '@nestjs/common';
import { HistorialRequestRepository } from './historial-request.repository';
import { CreateHistorialRequestDto } from './dto/create-historial-request.dto';
import { HistorialRequestMapper } from './historial-request.mapper';

@Injectable()
export class HistorialRequestService {

    constructor(private historialRequestRepository: HistorialRequestRepository){}


    async getAll(id_request: string){
        const entities = await this.historialRequestRepository.getAll(id_request) 
        return entities.map(d => HistorialRequestMapper.toDto(d))
    }

    create(dto: CreateHistorialRequestDto, opts = {}) {
        let entity = HistorialRequestMapper.toCreate(dto);
        return this.historialRequestRepository.create(entity, opts)
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { PositionMapper } from './position.mapper';
import { PositionResponseDto } from './dto';
import { validateObjectId } from 'src/helpers';

@Injectable()
export class PositionService {
    constructor(private positionRepository: PositionRepository){}

    async getAll(): Promise<PositionResponseDto[]> {
        const data = await this.positionRepository.getAll();
        return data.map(d => PositionMapper.toDto(d));
    }

    async findOne(id: string): Promise<PositionResponseDto> {
        await validateObjectId(id)
        const position = await this.positionRepository.findOne(id)
            
        if(!position) throw new NotFoundException("Position not found")
        return PositionMapper.toDto(position)
    }
}

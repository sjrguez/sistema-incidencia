import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentMapper } from './department.mapper';
import { DepartmentResponseDto } from './dto';
import { validateObjectId } from 'src/helpers';

@Injectable()
export class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository){}

    async getAll(): Promise<DepartmentResponseDto[]> {
        const data = await this.departmentRepository.getAll();
        return data.map(d => DepartmentMapper.toDto(d));
    }

    async findOne(id: string): Promise<DepartmentResponseDto> {
        await validateObjectId(id)
        const deparment = await this.departmentRepository.findOne(id)
            
        if(!deparment) throw new NotFoundException("deparment not found")
        return DepartmentMapper.toDto(deparment)
    }

    async create(data: any) {
        await this.departmentRepository.create(data)
        return "Department has been created"
    }
}

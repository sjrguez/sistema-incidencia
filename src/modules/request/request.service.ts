import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestRepository } from './request.repository';
import { CreateRequestDto, UpdateRequestDto, UpdateStatusRequestDto } from './dto';
import { RequestMapper } from './request.mapper';
import { EmployersService } from '../employers/employers.service';
import { DepartmentService } from '../department/department.service';
import { TypeRequestService } from '../type-request/type-request.service';
import { validateObjectId } from 'src/helpers';
import {  } from './dto/update-request.dto';

@Injectable()
export class RequestService {
    constructor(
        private requestRepository: RequestRepository,
        private employerService: EmployersService,
        private departmentService: DepartmentService,
        private typeRequestService: TypeRequestService
    ) {}

    async getAll() {
        const data = await this.requestRepository.getAll()
        return data.map(d => RequestMapper.toDto(d))
    }

    async create(dto: CreateRequestDto) {
        await this.employerService.findOne(dto.createdBy)
        await this.employerService.findOne(dto.asignedTo)

        await this.departmentService.findOne(dto.department)
        await this.typeRequestService.findOne(dto.typeRequest)

        const entity = RequestMapper.toCreate(dto)
        await this.requestRepository.create(entity)

        return "Request has been created"
    }

    async findOne(id: string){
        await validateObjectId(id);

        const entity = await this.requestRepository.findOne(id)

        if(!entity) {
            throw new NotFoundException("Request not found")
        }

        return RequestMapper.toDto(entity)
    }

    async update(dto: UpdateRequestDto, id: string) {
        await validateObjectId(id)
        const entity = await this.requestRepository.findOneForValidation(id)

        if(!entity) {
            throw new NotFoundException("Request not found")
        }

        let entitySaved = RequestMapper.toUpdate(dto, id)
        await this.requestRepository.update(entitySaved, id);
        return "Request has been update"
    }


    async updateStatus(dto: UpdateStatusRequestDto, id: string){
        await validateObjectId(id)
        const entity = await this.requestRepository.findOneForValidation(id)
        if(!entity) {
            throw new NotFoundException("Request not found")
        }

        let entitySaved = RequestMapper.toUpdateStatus(dto, id)
        await this.requestRepository.update(entitySaved, id)
        return "Status request has been update"
    }
}

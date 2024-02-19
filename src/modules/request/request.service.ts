import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RequestRepository } from './request.repository';
import { CreateRequestDto, UpdateRequestDto } from './dto';
import { RequestMapper } from './request.mapper';
import { EmployersService } from '../employers/employers.service';
import { DepartmentService } from '../department/department.service';
import { TypeRequestService } from '../type-request/type-request.service';
import { validateObjectId } from 'src/helpers';
import {  } from './dto/update-request.dto';
import { HistorialRequestService } from '../historial-request/historial-request.service';
import { CreateHistorialRequestDto } from '../historial-request/dto/create-historial-request.dto';
import { HistorialAction } from '../historial-request/enum';

@Injectable()
export class RequestService {
    constructor(
        private requestRepository: RequestRepository,
        private employerService: EmployersService,
        private departmentService: DepartmentService,
        private typeRequestService: TypeRequestService,
        private historialRequestService: HistorialRequestService
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

        const session = await this.requestRepository.RequestModel.startSession()
        session.startTransaction();
        const opts = {session}
        try {
            const entity = RequestMapper.toCreate(dto)
            const request: any = await this.requestRepository.create(entity, opts)
            const historialRequest = new CreateHistorialRequestDto({
                changer: dto.createdBy, // Hay que cambiarlo
                accion: HistorialAction.CREATED,
                request: request[0]._id
            })
            
            await this.historialRequestService.create(historialRequest, opts)
            await session.commitTransaction()

            return "Request has been created"
        } catch (error) {
            await session.abortTransaction()
            throw new InternalServerErrorException("Could not create request")
        } finally {
            await session.endSession()
        }
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
        const session = await this.requestRepository.RequestModel.startSession()
        session.startTransaction();
        const opts = { session }
        try {
            let entitySaved = RequestMapper.toUpdate(dto, id)
            await this.requestRepository.update(entitySaved, id, opts);
            const historialRequest = new CreateHistorialRequestDto({
                changer: dto.createdBy, // Hay que cambiarlo
                accion: HistorialAction.UPDATE,
                changes: {
                    from: entity,
                    to: entitySaved
                },
                request: id

            })
            await this.historialRequestService.create(historialRequest, opts)
            await session.commitTransaction()
            return "Request has been updated"
        } catch (error) {
            await session.abortTransaction()
            throw new InternalServerErrorException("Could not update request")
        } finally {
            await session.endSession()
        }
    }
}

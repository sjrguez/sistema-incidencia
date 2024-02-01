import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TypeRequestRepository } from './type-request.respository';
import { TypeRequestMapper } from './type-request.mapper';
import { CreateTypeRequestDto, UpdateTypeRequestDto } from './dto';
import { ErrorType, NameAlreadyExistException } from 'src/common';
import { validateObjectId } from 'src/helpers';

@Injectable()
export class TypeRequestService {

    constructor(private typeRequestRepository: TypeRequestRepository) {}

    async getAllforAdmin() {
        try {
            const data  = await this.typeRequestRepository.getAllforAdmin();
            return data.map(d => TypeRequestMapper.toDto(d)) 
        } catch (error) {
            throw new InternalServerErrorException("Could not get all types requests");
        }
    }

    async getAllforUsers() {
        try {
            const data  = await this.typeRequestRepository.getAllForUsers();
            return data.map(d => TypeRequestMapper.toDto(d)) 
        } catch (error) {
            throw new InternalServerErrorException("Could not get all types requests");
        }
    }

    async create(dto: CreateTypeRequestDto) {
        try {
            const entity = TypeRequestMapper.toCreate(dto)
            await this.typeRequestRepository.create(entity);
            return "Type Request has been created"
        } catch (error) {
            if(error.code === ErrorType.DuplicateKey ) {
                throw new NameAlreadyExistException(dto.name)
            }

            throw new InternalServerErrorException("Could not create type request");
        }
    }

    async findOne(id: string){
        await validateObjectId(id);
        
        const entity = await this.typeRequestRepository.findOne(id);

        if(!entity) {
            throw new NotFoundException("Type request not found")
        }

        return TypeRequestMapper.toDto(entity);
    }

    async update(dto: UpdateTypeRequestDto, id: string) {
        await this.findOne(id);
        
        const entity  = TypeRequestMapper.toUpdate(dto, id)
        await this.typeRequestRepository.update(entity, id)
        return "Type Request has been updated"
    }

    async delete(id: string) {
        await this.findOne(id);

        await this.typeRequestRepository.delete(id);
        return "Type Request has been deleted"
    }
}

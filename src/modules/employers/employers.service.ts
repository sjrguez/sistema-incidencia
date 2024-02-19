import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EmployersRepository } from './employers.repository';
import { CreateEmployerdto, EmployerResponseDto, UpdateEmployerDto, UpdateEmployerPasswordDto, UpdateEmployerStatusDto } from './dto';
import { EmployerMapper } from './employer.mapper';
import { UserService } from '../users/user.service';
import { ErrorType } from 'src/common';
import { EmployerCodeAlreadyExistException, UsernameAlreadyExistException } from 'src/common/exceptions';
import { HashHelper, validateObjectId } from 'src/helpers';

@Injectable()
export class EmployersService {
    constructor(private employerRepository: EmployersRepository, private userService: UserService){}

    async getAll() {
        try {
            const data = await this.employerRepository.getAll()
            return data.map(d => EmployerMapper.toDto(d))
            
        } catch (error) {
            throw new InternalServerErrorException("Could not get all employers")
        }
    }

    async create(employerDto: CreateEmployerdto) {
        
        const session = await this.employerRepository.EmployerModel.startSession()
        session.startTransaction();
        try {
            const opts = { session }
            employerDto.user = await this.userService.create(employerDto.user, opts);
            let employer = EmployerMapper.toCreate(employerDto);
            employer.password = await HashHelper.encrypt(employerDto.password)
            employer = await this.employerRepository.create(employer, opts)
            await session.commitTransaction()
            return "Employer has been created"
        } catch (error) {
            await session.abortTransaction()
            if(error.response) {
                throw new BadRequestException({
                    errorType: error.response.errorType,
                    message: error.response.message,
                    statusCode: error.response.statusCode
                })
            }

            if(error.code === ErrorType.DuplicateKey ) {
                if(Object.keys(error.keyValue).includes('username'))  {
                    throw new UsernameAlreadyExistException(employerDto.username) 
                } else {
                    throw new EmployerCodeAlreadyExistException(employerDto.employerCode)
                }
            }
            throw new InternalServerErrorException("Could not create employer")
        } finally {
            await session.endSession()
        }
    }


    async findOne(id: string): Promise<EmployerResponseDto> {
        await validateObjectId(id);

        const employer = await this.employerRepository.findOne(id);

        if(!employer) {
            throw new NotFoundException("Employer not found")
        }

        return EmployerMapper.toDto(employer)
    }

 
    async update(employerDto: UpdateEmployerDto, id: string) {
        await this.findOne(id);
        const session = await this.employerRepository.EmployerModel.startSession()
        session.startTransaction();
        const opts = { session }
        try {
            await this.userService.update(employerDto.user, employerDto.user._id, opts)
            const entity = EmployerMapper.toUpdate(employerDto)
            await this.employerRepository.update(entity, id, opts)
            await session.commitTransaction()

            return "Employer has been updated"
        } catch (error) {
            await session.abortTransaction()

            if(error.response) {
                throw new BadRequestException({
                    errorType: error.response.errorType,
                    message: error.response.message,
                    statusCode: error.response.statusCode
                })
            }

            throw new InternalServerErrorException("Could not update employer")
        } finally {
            await session.endSession()
        }
    }

    async updateStatus(employerDto: UpdateEmployerStatusDto, id: string) {
        await this.findOne(id);
        
        const entity = EmployerMapper.toUpdateStatus(employerDto, id);
        await this.employerRepository.update(entity, id)
        return "Employer's status updated"
    }

    async updatePassword(employerDto: UpdateEmployerPasswordDto, id: string) {
        await this.findOne(id);
        const employer = EmployerMapper.toUpdatePassword(id);
        employer.password = await HashHelper.encrypt(employerDto.password)
        await this.employerRepository.update(employer, id)
        return "employer's password has been updated"
    }

}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { ErrorType, StatusEnum } from 'src/common';
import { CedulaAlreadyExistException, MailAlreadyExistException } from 'src/common/exceptions';
import { UpdateUserDto, UserDto, UserResponseDto } from './dto';
import { User } from './entity/user.schema';
import { validateObjectId } from 'src/helpers';

@Injectable()
export class UserService {
    constructor(private userRepository: UsersRepository){} 

    async create(userDto: UserDto): Promise<UserResponseDto> {
        let user = UserMapper.toCreate(userDto);
        try {
            user = await this.userRepository.create(user)
            return UserMapper.toDto(user)
        } catch (error) {
            if(error.code === ErrorType.DuplicateKey ) {
                this.throwErrorForMailAndCedula(error, user)
            }
            throw new InternalServerErrorException("Could not create user.")
        }
    }

    async update(userDto: UpdateUserDto, id: string) {
        const userM = await this.findOne(id);
        
        try {
            const user = UserMapper.toUpdate(userM, userDto)
            return this.userRepository.update(user, id)
        } catch (error) {
            if(error.code === ErrorType.DuplicateKey ) {
                this.throwErrorForMailAndCedula(error, userM)
            }

            throw new InternalServerErrorException("Could not update user.")
        }
    }

    async findOne(id: string): Promise<UserResponseDto> {
        validateObjectId(id);
        const user = await this.userRepository.findOneById(id)

        if(!user) {
            throw new NotFoundException("User not found")
        }
        return UserMapper.toDto(user);
    }


    private throwErrorForMailAndCedula(error: any, user: User | UserResponseDto) {
        if(Object.keys(error.keyValue).includes('mail'))  {
            throw new MailAlreadyExistException(user.mail)
        }

        throw new CedulaAlreadyExistException(user.cedula)
    }


    async deleteUser(id: string) {
        const userM = await this.findOne(id);

        try {
            const user = UserMapper.toUpdate(userM, {status:StatusEnum.DELETED})
            return this.userRepository.update(user, id)
        } catch (error) {
            throw new InternalServerErrorException("Could not delete user.")
            
        }
    }
}

import { Body, Controller,Get,Param,Post, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UserService){}

    @Post('')
    create(@Body(ValidationPipe) UserDto: UserDto) {
        return this.userService.create(UserDto)
    }


    @Get('/:id')
    findOne(@Param('id') id: string){ 
        return this.userService.findOne(id)
    }
}

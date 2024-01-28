import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ValidationPipe } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerdto, UpdateEmployerDto, UpdateEmployerPasswordDto, UpdateEmployerStatusDto } from './dto';

@Controller('employers')
export class EmployersController {
    constructor(private employerService: EmployersService){}

    @Get()
    getAll() {
        return this.employerService.getAll()
    }

    @Post()
    create(@Body(ValidationPipe) employer: CreateEmployerdto) {
        return this.employerService.create(employer)
    }

    @Get('/:id')
    findOne(@Param('id') id: string){
        return this.employerService.findOne(id)
    }

    @Put("/:id")
    update(
        @Body(ValidationPipe) employer: UpdateEmployerDto,
        @Param('id') id: string
    ) {
        return this.employerService.update(employer, id)
    }

    @Patch("status/:id")
    updateStatus(
        @Body(ValidationPipe) employer: UpdateEmployerStatusDto,
        @Param('id') id: string
    ) {
        return this.employerService.updateStatus(employer, id)
    }


    @Patch('password/:id')
    updatePassword(
        @Body(ValidationPipe) employer: UpdateEmployerPasswordDto,
        @Param('id') id: string
    ) {
        return this.employerService.updatePassword(employer, id)
    }


    @Delete()
    deleteEmployer() {
        return 'deleted'
    }
}

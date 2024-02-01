import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TypeRequestService } from './type-request.service';
import { CreateTypeRequestDto, UpdateTypeRequestDto } from './dto';

@Controller('type-request')
export class TypeRequestController {
    
    constructor(private typeRequestService: TypeRequestService){}

    @Get('/admin')
    getAllForAdmin() {
        return this.typeRequestService.getAllforAdmin()
    }

    @Get('/users')
    getAllForUsers() {
        return this.typeRequestService.getAllforUsers()
    }


    @Post()
    create(
        @Body(ValidationPipe) typeRequest: CreateTypeRequestDto,
    ){
        return this.typeRequestService.create(typeRequest)
    }

    @Get('/:id')
    findOne(@Param('id') id: string){
        return this.typeRequestService.findOne(id)
    }

    @Patch("/:id")
    update(
        @Body(ValidationPipe) typeRequest: UpdateTypeRequestDto,
        @Param('id') id: string
    ){
        return this.typeRequestService.update(typeRequest, id)
    }

    @Delete("/:id")
    delete(
        @Param('id') id: string
    ) {
        return this.typeRequestService.delete(id);
    }
}

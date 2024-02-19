import { Body, Controller, Get, Param, Patch, Post, Put, ValidationPipe } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, UpdateRequestDto } from './dto';

@Controller('request')
export class RequestController {
    constructor(private requestService: RequestService){}

    @Get()
    getAll(){
        return this.requestService.getAll()
    }

    @Post()
    create(@Body(ValidationPipe) request: CreateRequestDto) {
        return this.requestService.create(request)
    }

    @Get('/:id')
    findOne(@Param('id') id: string){
        return this.requestService.findOne(id)
    }

    @Put('/:id')
    update(
        @Body(ValidationPipe) request: UpdateRequestDto,
        @Param('id') id: string
    ) {
        return this.requestService.update(request, id)
    }

}

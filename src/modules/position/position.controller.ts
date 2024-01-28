import { Controller, Get, Param } from '@nestjs/common';
import { PositionService } from './position.service';

@Controller('positions')
export class PositionController {
    constructor(private positionService: PositionService){}


    @Get()
    getAll() {
        return this.positionService.getAll();
    }

    @Get('/:id')
    findOne(@Param('id') id:string) {
        return this.positionService.findOne(id);
    }
}

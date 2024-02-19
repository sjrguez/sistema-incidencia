import { Controller, Get, Param } from '@nestjs/common';
import { HistorialRequestService } from './historial-request.service';

@Controller('historial')
export class HistorialRequestController {

    constructor(private historialRequestService: HistorialRequestService){}

    @Get('/:id')
    getAll(
        @Param('id') id: string
    ) {
        return this.historialRequestService.getAll(id)
    }
    
}

import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
    constructor(private departmentService: DepartmentService){}

    @Get('') 
    getAll() {
        return this.departmentService.getAll();
    }

    @Get("/:id")
    findOne(@Param('id') id: string) {
        return this.departmentService.findOne(id);
    }
}

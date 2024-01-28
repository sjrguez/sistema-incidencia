import { DepartmentResponseDto } from "./dto";
import { DepartmentEntity } from "./entity/department.schema";

export class DepartmentMapper  {

    static toDto (entity: DepartmentEntity) {

        const department = new DepartmentResponseDto();

        department._id = entity._id
        department.isIT = entity.isIT
        department.name = entity.name
        return department;
    }    
}
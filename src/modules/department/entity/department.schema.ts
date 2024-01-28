import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusEnum } from 'src/common/enums/status';


export type DepartmentDocument = HydratedDocument<DepartmentEntity>;

@Schema({collection: "departments"})
export class DepartmentEntity {

    @Prop({required: true})
    name: string;

    @Prop({required: true, default: false})
    isIT: boolean;

    @Prop({default: StatusEnum.ACTIVE, enum: StatusEnum})
    status: StatusEnum

    _id: string

    constructor(departm?: Partial<DepartmentEntity>) {
        Object.assign(this, departm);
    }
    
}


export const DepartmentSchema = SchemaFactory.createForClass(DepartmentEntity);

function overwrite(): (target: DepartmentEntity, propertyKey: "name") => void {
    throw new Error('Function not implemented.');
}

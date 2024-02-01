import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common';


export type DepartmentDocument = HydratedDocument<DepartmentEntity>;

@Schema({collection: "departments"})
export class DepartmentEntity extends BaseEntity{

    @Prop({required: true})
    name: string;

    @Prop({required: true, default: false})
    isIT: boolean;

    constructor(departm?: Partial<DepartmentEntity>) {
        super()
        Object.assign(this, departm);
    }
}


export const DepartmentSchema = SchemaFactory.createForClass(DepartmentEntity);
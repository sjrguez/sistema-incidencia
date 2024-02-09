import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity, StatusRequestEnum } from 'src/common';
import { DepartmentEntity } from 'src/modules/department/entity/department.schema';
import { EmployerEntity } from 'src/modules/employers/entity/employer.schema';
import { TypeRequestEntity } from 'src/modules/type-request/entity/type-request.schema';

export type RequestDocument = HydratedDocument<RequestEntity>;

@Schema({collection: "requests"})
export class RequestEntity {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
    department: DepartmentEntity

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'types_requests' })
    typeRequest: TypeRequestEntity

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'employers' })
    asignedTo: EmployerEntity

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'employers' })
    createdBy: EmployerEntity
    
    @Prop({required: true})
    telephone: string

    @Prop({required: true})
    pcName: string

    @Prop({required: true})
    description: string

    @Prop({required: true})
    issue: string

    @Prop()
    dueDate: Date

    @Prop({default: StatusRequestEnum.OPEN})
    status: StatusRequestEnum

    @Prop({default: new Date()})
    createAt: Date

    @Prop({})
    updateAt: Date
    
    @Prop()
    deleteAt: Date

    _id: string

    constructor(request?: Partial<RequestEntity>) {
        Object.assign(this, request);
    }
}

export const RequestSchema = SchemaFactory.createForClass(RequestEntity);
function overwrite(): (target: RequestEntity, propertyKey: "status") => void {
    throw new Error('Function not implemented.');
}


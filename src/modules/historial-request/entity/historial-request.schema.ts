import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { EmployerEntity } from "src/modules/employers/entity/employer.schema";
import { RequestEntity } from "src/modules/request/entity/request.schema";
import { HistorialAction } from "../enum";
export type DepartmentDocument = HydratedDocument<HistorialRequestEntity>;


class ChangesRequest {
    to: RequestEntity
    from: RequestEntity
} 
@Schema({collection: "historials-requests"})
export class HistorialRequestEntity {
    
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'requests' })
    request: RequestEntity

    @Prop({required: true})
    accion: HistorialAction;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'employers' })
    changer: EmployerEntity

    @Prop({type: ChangesRequest})
    changes: ChangesRequest

    @Prop({default: new Date()})
    createAt: Date
    
    _id: string;
    
    constructor(departm?: Partial<HistorialRequestEntity>) {
        Object.assign(this, departm);
    }
}


export const HistorialRequestSchema = SchemaFactory.createForClass(HistorialRequestEntity);
    
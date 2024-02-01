import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common';
import { StatusEnum } from 'src/common/enums/status';


export type TypeRequestEntityDocument = HydratedDocument<TypeRequestEntity>;

@Schema({collection: "types_requests"})
export class TypeRequestEntity extends BaseEntity {

    @Prop({required: true, unique: true})
    name: string;

    @Prop({default: StatusEnum.ACTIVE, enum: StatusEnum})
    status: StatusEnum

    _id: string

    constructor(departm?: Partial<TypeRequestEntity>) {
        super()
        Object.assign(this, departm);
    }
}


export const TypeRequestSchema = SchemaFactory.createForClass(TypeRequestEntity);

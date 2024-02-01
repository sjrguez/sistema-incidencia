import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common';


export type PositionDocument = HydratedDocument<PositionEntity>;

@Schema({collection: "positions"})
export class PositionEntity extends BaseEntity {
    @Prop({required: true})
    name: string;

    @Prop({default: false})
    superUser: boolean;
    constructor(position?: Partial<PositionEntity>) {
        super()
        Object.assign(this, position);
    }
}


export const PositionSchema = SchemaFactory.createForClass(PositionEntity);
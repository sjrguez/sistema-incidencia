import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusEnum } from 'src/common/enums/status';


export type PositionDocument = HydratedDocument<PositionEntity>;

@Schema({collection: "positions"})
export class PositionEntity {
    @Prop({required: true})
    name: string;

    @Prop({default: false})
    superUser: boolean;

    @Prop({default: StatusEnum.ACTIVE, enum: StatusEnum})
    status: StatusEnum

    _id: string
    
    constructor(position?: Partial<PositionEntity>) {
        Object.assign(this, position);
    }
}


export const PositionSchema = SchemaFactory.createForClass(PositionEntity);
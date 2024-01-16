import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusEnum } from 'src/common/enums/status';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    firstname: string;

    @Prop({required: true})
    lastname: string;

    @Prop({required: true})
    telephone: string;

    @Prop({required: true, unique: true})
    mail: string

    @Prop({required: true, unique: true})
    cedula: string

    @Prop({required: true})
    address: string

    @Prop({default: StatusEnum.ACTIVE, enum: StatusEnum})
    status: StatusEnum

    @Prop({default: new Date()})
    createAt: Date

    @Prop()
    deleteAt: Date

    _id: string
}


export const UserSchema = SchemaFactory.createForClass(User);
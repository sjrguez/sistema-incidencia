import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusEnum } from 'src/common/enums/status';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({collection: "users"})
export class UserEntity {
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

    @Prop({})
    updateAt: Date
    
    @Prop()
    deleteAt: Date

    _id: string

    constructor(user?: Partial<UserEntity>) {
        Object.assign(this, user);
    }
}


export const UserSchema = SchemaFactory.createForClass(UserEntity);
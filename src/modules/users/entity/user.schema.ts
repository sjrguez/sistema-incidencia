import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/common';
import { StatusEnum } from 'src/common/enums/status';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({collection: "users"})
export class UserEntity extends BaseEntity {
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

    constructor(user?: Partial<UserEntity>) {
        super()
        Object.assign(this, user);
    }
}


export const UserSchema = SchemaFactory.createForClass(UserEntity);
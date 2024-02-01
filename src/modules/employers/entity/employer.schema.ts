import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { PositionEntity } from "../../position/entity/position.schema";
import { BaseEntity } from "src/common";
import { DepartmentEntity } from "../../department/entity/department.schema";
import { UserEntity } from "../../users/entity/user.schema";

export type EmployerDocument = mongoose.HydratedDocument<EmployerEntity>

@Schema({collection: "employers", autoIndex: true})
export class EmployerEntity extends BaseEntity {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Position' })
    position: PositionEntity

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: UserEntity

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
    department: DepartmentEntity

    @Prop({required: true, unique: true})
    username: string
    
    @Prop({required: true, unique: true})
    employerCode: string
    
    @Prop({required: true})
    password: string;

    constructor(user?: Partial<UserEntity>) {
        super()
        Object.assign(this, user);
    }
}

export const EmployerSchema = SchemaFactory.createForClass(EmployerEntity);
EmployerSchema.index({ username: 1, employerCode: 1 }, { unique: true });

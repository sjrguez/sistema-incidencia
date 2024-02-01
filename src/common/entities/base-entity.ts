import { Prop } from "@nestjs/mongoose"
import { StatusEnum } from "../enums"

export class BaseEntity {
    @Prop({default: StatusEnum.ACTIVE, enum: StatusEnum})
    status: StatusEnum

    @Prop({default: new Date()})
    createAt: Date

    @Prop({})
    updateAt: Date
    
    @Prop()
    deleteAt: Date

    _id: string
}
import { Model } from "mongoose";
import { TypeRequestEntity } from "./entity/type-request.schema";
import { InjectModel } from "@nestjs/mongoose";
import { StatusEnum } from "src/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TypeRequestRepository {
    constructor(@InjectModel(TypeRequestEntity.name) private TypeRequestModel: Model<TypeRequestEntity>,) {}

    // Lleva paginacion
    getAllforAdmin() {
        return this.TypeRequestModel.find({
            status: {
                $ne: StatusEnum.DELETED
            }
        })
    }

    getAllForUsers() {
        return this.TypeRequestModel.find({
            status: StatusEnum.ACTIVE
        })
    }

    create(entity: TypeRequestEntity) {
        return this.TypeRequestModel.create(entity)
    }

    findOne(_id: string) {
        return this.TypeRequestModel.findOne({
            _id,
            status: {$ne: StatusEnum.DELETED } 
        })
    }

    update(entity: TypeRequestEntity, _id: string) {
        return  this.TypeRequestModel.updateOne(
            {_id},
            { $set: entity },
            {runValidators: true}
        )
    }

    delete(_id: string) {
        const data = {
            deleteAt: new Date(),
            status: StatusEnum.DELETED
        }
        return  this.TypeRequestModel.updateOne(
            {_id},
            { $set: data },
            {runValidators: true}
        )
    }
}
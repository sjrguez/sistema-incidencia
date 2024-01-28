import { InjectModel } from "@nestjs/mongoose";
import { PositionEntity } from "./entity/position.schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { StatusEnum } from "src/common";

@Injectable()
export class PositionRepository  {
    constructor(@InjectModel(PositionEntity.name) private positionModel: Model<PositionEntity>,) {}

    
    getAll(): Promise<PositionEntity[]> {
        return this.positionModel.find({
            status: {
                $ne: StatusEnum.DELETED
            }
        })
    }


    findOne(id: string): Promise<PositionEntity> {
        return this.positionModel.findOne({
            _id: id,
            status: {
                $ne: StatusEnum.DELETED
            } 
        })
    }
}
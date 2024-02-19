import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DepartmentEntity } from "./entity/department.schema";
import { Model } from "mongoose";
import { StatusEnum } from "src/common";

@Injectable()
export class DepartmentRepository {

    constructor(@InjectModel(DepartmentEntity.name) private DepartmentModel: Model<DepartmentEntity>,) {}

    getAll(): Promise<DepartmentEntity[]> {
        return this.DepartmentModel.find({
            status: {
                $ne: StatusEnum.DELETED
            } 
        })
    }

    findOne(id:string): Promise<DepartmentEntity> {
        return this.DepartmentModel.findOne({
            _id: id,
            status: {
                $ne: StatusEnum.DELETED
            } 
        })
    }

    create(data) {
        return this.DepartmentModel.create(data)
    }
}
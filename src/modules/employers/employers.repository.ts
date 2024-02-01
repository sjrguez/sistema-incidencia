import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EmployerEntity } from "./entity/employer.schema";
import { Model } from "mongoose";
import { StatusEnum } from "src/common";
import { PositionEntity } from "../position/entity/position.schema";
import { UserEntity } from "../users/entity/user.schema";
import { DepartmentEntity } from "../department/entity/department.schema";

@Injectable()
export class EmployersRepository {
    constructor(
        @InjectModel(EmployerEntity.name) public EmployerModel: Model<EmployerEntity>,
        @InjectModel(PositionEntity.name) private PositionModel: Model<PositionEntity>,
        @InjectModel(DepartmentEntity.name) private DepartmentModel: Model<DepartmentEntity>,
        @InjectModel(UserEntity.name) private UserModel: Model<UserEntity>
        ){
            this.EmployerModel.syncIndexes()
        }

   async  getAll() {
        return this.EmployerModel.find({status: {
            $ne: StatusEnum.DELETED
        }})
        .populate('position','' , this.PositionModel)
        .populate('department','' , this.DepartmentModel)
        .populate('user','' , this.UserModel)
        .exec()
    }


    findOne(_id: string) {
        return this.EmployerModel.findById({
            _id, 
            status: {
                $ne: StatusEnum.DELETED
            }
        })
        .populate('position','' , this.PositionModel)
        .populate('department','' , this.DepartmentModel)
        .populate('user','' , this.UserModel)
        .exec()
    }


    async create(entity: EmployerEntity, options = {}): Promise<any> {
        return this.EmployerModel.create([entity], options)
    }

    update(entity: Partial<EmployerEntity>, _id: string, options = {}) {
        return this.EmployerModel.findOneAndUpdate(
            { _id},
            { $set: entity},
            {runValidators: true,...options}
        )
    }
}
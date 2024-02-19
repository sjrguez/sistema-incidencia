import { Injectable } from "@nestjs/common";
import { RequestEntity } from "./entity/request.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmployerEntity } from "../employers/entity/employer.schema";
import { UserEntity } from "../users/entity/user.schema";
import { DepartmentEntity } from "../department/entity/department.schema";
import { TypeRequestEntity } from "../type-request/entity/type-request.schema";
import { PositionEntity } from "../position/entity/position.schema";

@Injectable()
export class RequestRepository {

    constructor(
        @InjectModel(RequestEntity.name) public RequestModel: Model<RequestEntity>,
        @InjectModel(EmployerEntity.name) private EmployerModel: Model<EmployerEntity>,
        @InjectModel(UserEntity.name) private UserModel: Model<UserEntity>,
        @InjectModel(DepartmentEntity.name) private DepartmentModel: Model<DepartmentEntity>,
        @InjectModel(TypeRequestEntity.name) private TypeRequestModel: Model<TypeRequestEntity>,
        @InjectModel(PositionEntity.name) private PositionModel: Model<PositionEntity>,
        
        ) {}


    getAll() {

        return this.RequestModel.find()
        .populate('typeRequest','' , this.TypeRequestModel)
        .populate('department','' , this.DepartmentModel)
        .populate({
            path: 'asignedTo',
            model: this.EmployerModel,
            populate: [
                { path: 'user', strictPopulate: false, model: this.UserModel},
                { path: 'position', strictPopulate: false, model: this.PositionModel},
                { path: 'department', strictPopulate: false, model: this.DepartmentModel},
            ]
        })
        .populate({
            path: 'createdBy',
            model: this.EmployerModel,
            populate: [
                { path: 'user', strictPopulate: false, model: this.UserModel},
                { path: 'position', strictPopulate: false, model: this.PositionModel},
                { path: 'department', strictPopulate: false, model: this.DepartmentModel},
            ]
        })
        .exec()
    }


    create(entity: RequestEntity, opts = {}) {
        return this.RequestModel.create([entity], opts)
    }

    findOne(_id: string) {
        return this.RequestModel.findById({
            _id
        })
        .populate('department','' , this.DepartmentModel)
        .populate('typeRequest','' , this.TypeRequestModel)
        .populate({
            path: 'asignedTo',
            model: this.EmployerModel,
            populate: [
                { path: 'user', strictPopulate: false, model: this.UserModel},
                { path: 'position', strictPopulate: false, model: this.PositionModel},
                { path: 'department', strictPopulate: false, model: this.DepartmentModel},
            ]
        })
        .populate({
            path: 'createdBy',
            model: this.EmployerModel,
            populate: [
                { path: 'user', strictPopulate: false, model: this.UserModel},
                { path: 'position', strictPopulate: false, model: this.PositionModel},
                { path: 'department', strictPopulate: false, model: this.DepartmentModel},
            ]
        })
        .exec()
    }

    findOneForValidation(_id: string) {
        return this.RequestModel.findById({
            _id
        })
    }

    update(entity: Partial<RequestEntity>, _id: string, opts: any) {
        return this.RequestModel.updateOne(
            { _id},
            { $set: entity},
            {runValidators: true, ...opts},
        )
    }

}
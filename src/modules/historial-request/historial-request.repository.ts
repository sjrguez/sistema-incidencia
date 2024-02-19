import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HistorialRequestEntity } from "./entity/historial-request.schema";
import { Model } from "mongoose";
import { PositionEntity } from "../position/entity/position.schema";
import { EmployerEntity } from "../employers/entity/employer.schema";
import { UserEntity } from "../users/entity/user.schema";
import { DepartmentEntity } from "../department/entity/department.schema";
import { TypeRequestEntity } from "../type-request/entity/type-request.schema";

@Injectable()
export class HistorialRequestRepository{

    constructor(
        @InjectModel(HistorialRequestEntity.name) private historialRequestModel: Model<HistorialRequestEntity>,
        @InjectModel(EmployerEntity.name) private employerModel: Model<EmployerEntity>,
        @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
        @InjectModel(DepartmentEntity.name) private departmentModel: Model<DepartmentEntity>,
        @InjectModel(PositionEntity.name) private positionModel: Model<PositionEntity>,
        @InjectModel(TypeRequestEntity.name) private typeRequestModel: Model<TypeRequestEntity>,

    ) {}


    getAll(id_request: string) {

        return this.historialRequestModel.find({request: id_request})
        .populate(this.returnPopulate("changer"))
        .populate('changes.from.typeRequest','' , this.typeRequestModel)
        .populate('changes.from.department','' , this.departmentModel)
        .populate( this.returnPopulate("changes.from.asignedTo"))
        .populate(this.returnPopulate("changes.from.createdBy"))
        .populate('changes.to.typeRequest','' , this.typeRequestModel)
        .populate('changes.to.department','' , this.departmentModel)
        .populate( this.returnPopulate("changes.to.asignedTo"))
        .populate(this.returnPopulate("changes.to.createdBy"))
        .exec()
        
    }

    create(entity: HistorialRequestEntity, options = {}) {
        return this.historialRequestModel.create([entity], options)
    }


    private returnPopulate (path: string) {
        return {
                path,
                model: this.employerModel,
                populate: [
                    { path: 'user', strictPopulate: false, model: this.userModel},
                ]
        }
    }
}
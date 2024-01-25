import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity, UserDocument } from "./entity/user.schema";
import { ClientSession, Model } from "mongoose";
import { UserDto } from "./dto";
import { StatusEnum } from "src/common";


@Injectable()
export class UsersRepository {
    constructor(@InjectModel(UserEntity.name) private UserModel: Model<UserEntity>){}

    create(user: UserDto, options = {}): Promise<any[]> {
        return this.UserModel.create([user], options)
    }

    update(user: Partial<UserEntity>, _id: string, options = {}) {
        return this.UserModel.updateOne({_id }, user, options)
    }

    findOne(_id: string) {
        return this.UserModel.findOne({
            _id, 
            status: {
                $ne: StatusEnum.DELETED
            }
        })
    }
}
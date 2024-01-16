import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./entity/user.schema";
import { Model } from "mongoose";
import { UserDto } from "./dto";


@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private UserModel: Model<User>){}

    create(user: UserDto): Promise<UserDocument> {
        return this.UserModel.create(user)
    }

    update(user: Partial<User>, _id: string) {
        return this.UserModel.updateOne({_id }, user)
    }

    findOneById(id: string) {
        return this.UserModel.findById(id)
    }
}
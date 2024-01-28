import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";

export async function validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException("ID not found")
    }

    return Promise.resolve(true)
}


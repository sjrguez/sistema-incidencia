import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";

export function validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException("ID not found")
    }
}


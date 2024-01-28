import { ConflictException } from "@nestjs/common";
import { ErrorType } from "../enums";

export class UsernameAlreadyExistException extends ConflictException {
    constructor(username: string) {
        super({
          errorType: ErrorType.UsernameAlreadyExists,
          message: `this username already exists: ${username}`,
          statusCode: 400
        });
    }
}
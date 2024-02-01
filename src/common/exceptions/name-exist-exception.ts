import { ConflictException } from "@nestjs/common";
import { ErrorType } from "../enums";

export class NameAlreadyExistException extends ConflictException {
    constructor(name: string) {
        super({
          errorType: ErrorType.NameAlreadyExists,
          message: `this name already exists: ${name}`,
          statusCode: 400
        });
    }
}
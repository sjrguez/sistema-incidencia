import { ConflictException } from "@nestjs/common";
import { ErrorType } from "../enums";

export class EmployerCodeAlreadyExistException extends ConflictException {
    constructor(code: string) {
        super({
          errorType: ErrorType.EmployerCodeAlreadyExists,
          message: `this employer code already exists: ${code}`,
          statusCode: 400
        });
    }
}
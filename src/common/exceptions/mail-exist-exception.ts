import { ConflictException } from "@nestjs/common";
import { ErrorType } from "../enums/error-type";

export class MailAlreadyExistException extends ConflictException {
    constructor(mail: string) {
        super({
          errorType: ErrorType.MailAlreadyExists,
          message: `this email already exists: ${mail}`,
          statusCode: 400
        });
      }
    
}
import { ConflictException } from "@nestjs/common";
import { ErrorType } from "../enums/error-type";

export class CedulaAlreadyExistException extends ConflictException {
    constructor(mail: string) {
        super({
          errorType: ErrorType.CedulaAlreadyExists,
          message: `cedula already exists: ${mail}`
        });
      }
    
}
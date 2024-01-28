import { ConflictException } from "@nestjs/common";
import { ErrorType } from "../enums/error-type";

export class CedulaAlreadyExistException extends ConflictException {
  constructor(cedula: string) {
    super({
      errorType: ErrorType.CedulaAlreadyExists,
      message: `this cedula already exists: ${cedula}`,
      statusCode: 400
    });
  }
}
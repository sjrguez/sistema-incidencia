import { ResponseRequestDto } from "src/modules/request/dto";

interface changes {
    to: ResponseRequestDto,
    from: ResponseRequestDto
}

export class ResponseHistorialRequest {
    _id: string;
    createAt: Date;
    charger: string;
    pcName: string
    accion: string
    changes: changes
}
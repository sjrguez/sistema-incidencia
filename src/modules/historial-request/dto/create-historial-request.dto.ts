import { HistorialAction } from "../enum"

export class CreateHistorialRequestDto {
    request: string
    accion: HistorialAction
    changer: string
    changes?: {
        to: any
        from: any
    }

    constructor(departm?: Partial<CreateHistorialRequestDto>) {
        Object.assign(this, departm);
    }
}
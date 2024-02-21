import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { RequestEntity } from "src/modules/request/entity/request.schema";
export type FileRequestDocument = HydratedDocument<FileRequestEntity>;

@Schema({collection: "files-requests"})
export class FileRequestEntity {
    
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'requests' })
    request: RequestEntity

    @Prop({required: true})
    pathFile: string;

    @Prop({required: true})
    filename: string

    @Prop({default: new Date()})
    createAt: Date
    
    _id: string;
    
    constructor(entity?: Partial<FileRequestEntity>) {
        Object.assign(this, entity);
    }
}


export const HistorialRequestSchema = SchemaFactory.createForClass(FileRequestEntity);
    
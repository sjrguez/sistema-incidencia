import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileRequestEntity } from './entity/file-request.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilesRequestRepository {

    constructor(
        @InjectModel(FileRequestEntity.name) private fileRequestModel: Model<FileRequestEntity>,
    ) {}

    create(entity: FileRequestEntity, opts = {}) {
        return this.fileRequestModel.create(entity, opts)
    }
}

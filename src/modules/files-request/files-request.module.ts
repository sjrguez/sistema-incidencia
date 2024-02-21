import { Module } from '@nestjs/common';
import { FilesRequestService } from './files-request.service';
import { FilesRequestController } from './files-request.controller';
import { FilesRequestRepository } from './files-request.repository';

@Module({
  controllers: [FilesRequestController],
  providers: [FilesRequestService,FilesRequestRepository],
  exports: [FilesRequestService,FilesRequestRepository]
})
export class FilesRequestModule {}

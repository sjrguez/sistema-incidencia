import { Module } from '@nestjs/common';
import { TypeRequestController } from './type-request.controller';
import { TypeRequestService } from './type-request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeRequestEntity, TypeRequestSchema } from './entity/type-request.schema';
import { TypeRequestRepository } from './type-request.respository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: TypeRequestEntity.name, schema: TypeRequestSchema }
      ]
      ),
  ],
  controllers: [TypeRequestController],
  providers: [TypeRequestService,TypeRequestRepository]
})
export class TypeRequestModule {}

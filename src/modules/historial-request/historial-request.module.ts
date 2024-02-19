import { Module } from '@nestjs/common';
import { HistorialRequestController } from './historial-request.controller';
import { HistorialRequestService } from './historial-request.service';
import { HistorialRequestRepository } from './historial-request.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialRequestEntity, HistorialRequestSchema } from './entity/historial-request.schema';
import { EmployerEntity, EmployerSchema } from '../employers/entity/employer.schema';
import { UserEntity, UserSchema } from '../users/entity/user.schema';
import { RequestEntity, RequestSchema } from '../request/entity/request.schema';
import { TypeRequestEntity, TypeRequestSchema } from '../type-request/entity/type-request.schema';
import { DepartmentEntity, DepartmentSchema } from '../department/entity/department.schema';
import { PositionEntity, PositionSchema } from '../position/entity/position.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: HistorialRequestEntity.name, schema: HistorialRequestSchema },
        { name: EmployerEntity.name, schema: EmployerSchema },
        { name: UserEntity.name, schema: UserSchema },
        { name: RequestEntity.name, schema: RequestSchema },
        { name: TypeRequestEntity.name, schema: TypeRequestSchema },
        { name: DepartmentEntity.name, schema: DepartmentSchema },
        { name: PositionEntity.name, schema: PositionSchema },
      ]
    ),
    
  ],
  controllers: [HistorialRequestController],
  providers: [HistorialRequestService, HistorialRequestRepository],
  exports: [HistorialRequestService, HistorialRequestRepository]
})
export class HistorialRequestModule {}

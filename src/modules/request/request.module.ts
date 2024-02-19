import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestRepository } from './request.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerEntity, EmployerSchema } from '../employers/entity/employer.schema';
import { UserEntity, UserSchema } from '../users/entity/user.schema';
import { RequestEntity, RequestSchema } from './entity/request.schema';
import { DepartmentEntity, DepartmentSchema } from '../department/entity/department.schema';
import { TypeRequestEntity, TypeRequestSchema } from '../type-request/entity/type-request.schema';
import { EmployersModule } from '../employers/employers.module';
import { DepartmentModule } from '../department/department.module';
import { TypeRequestModule } from '../type-request/type-request.module';
import { EmployersService } from '../employers/employers.service';
import { PositionEntity, PositionSchema } from '../position/entity/position.schema';
import { HistorialRequestModule } from '../historial-request/historial-request.module';
import { HistorialRequestService } from '../historial-request/historial-request.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: EmployerEntity.name, schema: EmployerSchema },
        { name: UserEntity.name, schema: UserSchema },
        { name: RequestEntity.name, schema: RequestSchema },
        { name: TypeRequestEntity.name, schema: TypeRequestSchema },
        { name: DepartmentEntity.name, schema: DepartmentSchema },
        { name: PositionEntity.name, schema: PositionSchema },
      ]
      ),
      EmployersModule,
      DepartmentModule,
      TypeRequestModule,
      HistorialRequestModule
  ],
  controllers: [RequestController],
  providers: [
    RequestService,
    RequestRepository,
    EmployersService,
    HistorialRequestService
  ]
})
export class RequestModule {}

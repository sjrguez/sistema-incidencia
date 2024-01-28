import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentEntity, DepartmentSchema } from './entity/department.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: DepartmentEntity.name, schema: DepartmentSchema }
      ]
      ),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService,DepartmentRepository]
})
export class DepartmentModule {}

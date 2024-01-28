import { Module } from '@nestjs/common';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerEntity, EmployerSchema } from './entity/employer.schema';
import { EmployersRepository } from './employers.repository';
import { UserEntity, UserSchema } from '../users/entity/user.schema';
import { PositionEntity, PositionSchema } from '../position/entity/position.schema';
import { DepartmentEntity, DepartmentSchema } from '../department/entity/department.schema';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: EmployerEntity.name, schema: EmployerSchema },
        { name: UserEntity.name, schema: UserSchema },
        { name: PositionEntity.name, schema: PositionSchema },
        { name: DepartmentEntity.name, schema: DepartmentSchema },
      ]
      ),
      UserModule
  ],
  controllers: [
    EmployersController,
  ],
  providers: [EmployersService, EmployersRepository]
})
export class EmployersModule {}

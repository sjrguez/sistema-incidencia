import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { PositionRepository } from './position.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PositionEntity, PositionSchema } from './entity/position.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: PositionEntity.name, schema: PositionSchema }
      ]
      ),
  ],
  controllers: [PositionController],
  providers: [PositionService,PositionRepository]
})
export class PositionModule {}

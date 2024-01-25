import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entity/user.schema';
import { UsersRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository]
})
export class UserModule {}

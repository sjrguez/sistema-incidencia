import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/users/users.module';
import { EmployersModule } from './modules/employers/employers.module';
import { DepartmentModule } from './modules/department/department.module';
import { PositionModule } from './modules/position/position.module';
import { ResponseTransformerInterceptor } from './common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeRequestModule } from './modules/type-request/type-request.module';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    EmployersModule,
    DepartmentModule,
    PositionModule,
    TypeRequestModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    }
  ],
})
export class AppModule {}

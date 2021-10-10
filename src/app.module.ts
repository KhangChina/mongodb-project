import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DistrictModule } from './district/district.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './auth/logger.middleware';
@Module({
  imports: [MongooseModule.forRoot('mongodb://root:example@localhost:27017/nestjs?authSource=admin'),DistrictModule, UserModule,AuthModule],
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user','district');
  }
}

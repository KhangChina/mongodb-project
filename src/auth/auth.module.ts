import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
@Module({
  imports:[UserModule,JwtModule.register({
    secret:'China',
    signOptions:{ expiresIn: '1d'}
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

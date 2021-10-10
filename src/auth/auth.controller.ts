import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post()
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto.username,loginDto.password)
    }
}

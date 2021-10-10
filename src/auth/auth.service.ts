import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService: JwtService){}
    async login(username: string, pass: string){
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
          const payload = {id:user.id}
          return {
            access_token: this.jwtService.sign(payload)
          }
        }
        throw new UnauthorizedException()
      }
}

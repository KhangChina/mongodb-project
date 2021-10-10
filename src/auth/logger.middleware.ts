import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, 'China');
      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException()
      }

      req.user = user;
      next();

    } else {
      throw new UnauthorizedException()
    }
  }
}

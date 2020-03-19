import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const req: Request = httpContext.getRequest();
    const authHeader = req.header('Authorization');
    const jwtToken = authHeader && authHeader.split(' ')[1];

    if (!jwtToken) {
      throw new UnauthorizedException();
    }

    try {
      const { token, platform } = await this.jwtService.verifyAsync(jwtToken);
      const res: Response = httpContext.getResponse();

      res.locals.token = token;
      res.locals.platform = platform;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

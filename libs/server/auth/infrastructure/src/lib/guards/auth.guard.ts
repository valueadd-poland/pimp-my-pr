import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RemoteTokenCryptoService } from '@pimp-my-pr/server/auth/port';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokenCryptoService: RemoteTokenCryptoService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const authHeader = req.header('Authorization');
    const jwtToken = authHeader && authHeader.split(' ')[1];
    if (!jwtToken) {
      throw new UnauthorizedException();
    }

    try {
      const { token, platform, user } = await this.jwtService.verifyAsync(jwtToken);

      req.credentials = { token: await this.tokenCryptoService.decrypt(token), platform };
      req.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

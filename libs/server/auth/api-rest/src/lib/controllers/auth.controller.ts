import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthFacade } from '@pimp-my-pr/server/auth/core/application-services';
import { AuthResponse, Platform } from '@pimp-my-pr/shared/domain';
import { AccessTokenBodyDto } from '../dto/access-token-body.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authFacade: AuthFacade) {}

  @Post('access-token')
  getJwtToken(@Body() body: AccessTokenBodyDto): Promise<AuthResponse> {
    switch (body.platform) {
      case Platform.bitbucket: {
        return this.authFacade.getBitbucketAccessToken(body.code);
      }

      case Platform.github: {
        return this.authFacade.getGithubAccessToken(body.code);
      }

      default: {
        throw new NotImplementedException(
          `authorization for ${body.platform} is not implemented yet`
        );
      }
    }
  }
}

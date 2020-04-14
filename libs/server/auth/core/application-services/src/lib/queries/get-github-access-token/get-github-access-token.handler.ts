import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { AuthTokenReadModel } from '../../read-models/auth-token.read-model';
import { GetGithubAccessTokenQuery } from './get-github-access-token.query';

@QueryHandler(GetGithubAccessTokenQuery)
export class GetGithubAccessTokenHandler
  implements IQueryHandler<GetGithubAccessTokenQuery, AuthTokenReadModel> {
  constructor(private authRepository: AuthTokenRepository, private jwtService: JwtService) {}

  async execute(query: GetGithubAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { token } = await this.authRepository.getGithubAccessToken(query.githubCode);

    const jwtPayload = {
      token,
      platform: Platform.github
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { token: jwtToken };
  }
}

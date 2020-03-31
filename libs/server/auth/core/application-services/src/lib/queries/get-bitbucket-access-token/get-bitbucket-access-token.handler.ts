import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBitbucketAccessTokenQuery } from './get-bitbucket-access-token.query';
import { AuthTokenReadModel } from '../../read-models/auth-token.read-model';
import { BaseAuthRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { JwtService } from '@nestjs/jwt';
import { Platform } from '@pimp-my-pr/shared/domain';

@QueryHandler(GetBitbucketAccessTokenQuery)
export class GetBitbucketAccessTokenHandler
  implements IQueryHandler<GetBitbucketAccessTokenQuery, AuthTokenReadModel> {
  constructor(private authRepository: BaseAuthRepository, private jwtService: JwtService) {}

  async execute(query: GetBitbucketAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { token } = await this.authRepository.getBitbucketAccessToken(query.bitbucketCode);

    const jwtPayload = {
      token,
      platform: Platform.bitbucket
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { token: jwtToken };
  }
}

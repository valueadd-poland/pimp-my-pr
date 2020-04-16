import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenRepository,
  authTokenRepositoryFactoryToken
} from '@pimp-my-pr/server/auth/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { AuthTokenReadModel } from '../../read-models/auth-token/auth-token.read-model';
import { GetBitbucketAccessTokenQuery } from './get-bitbucket-access-token.query';

@QueryHandler(GetBitbucketAccessTokenQuery)
export class GetBitbucketAccessTokenHandler
  implements IQueryHandler<GetBitbucketAccessTokenQuery, AuthTokenReadModel> {
  private authTokenRepository: AuthTokenRepository;

  constructor(
    @Inject(authTokenRepositoryFactoryToken)
    authTokenRepositoryFactory: (platform: Platform) => AuthTokenRepository,
    private jwtService: JwtService
  ) {
    this.authTokenRepository = authTokenRepositoryFactory(Platform.bitbucket);
  }
  async execute(query: GetBitbucketAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { token } = await this.authTokenRepository.getAccessToken(query.bitbucketCode);

    const jwtPayload = {
      token,
      platform: Platform.bitbucket
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { token: jwtToken };
  }
}

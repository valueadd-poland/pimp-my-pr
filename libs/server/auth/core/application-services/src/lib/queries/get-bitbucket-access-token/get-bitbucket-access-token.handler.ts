import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenRepository,
  authTokenRepositoryFactoryToken
} from '@pimp-my-pr/server/auth/core/domain-services';
import { AddUserCommand, UserPublicFacade, UserRepository } from '@pimp-my-pr/server/user/public';
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
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private userFacade: UserPublicFacade
  ) {
    this.authTokenRepository = authTokenRepositoryFactory(Platform.bitbucket);
  }

  async execute(query: GetBitbucketAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { token } = await this.authTokenRepository.getAccessToken(query.bitbucketCode);
    const userData = { ...(await this.userRepository.loadCurrentUser(token, Platform.bitbucket)) };

    let user = await this.userRepository.findById(userData.id);
    if (!user) {
      await this.userFacade.add(new AddUserCommand(userData.id, userData.name, userData.avatarUrl));
      user = await this.userRepository.getById(userData.id);
    }

    const jwtPayload = {
      token,
      platform: Platform.bitbucket,
      user
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { token: jwtToken };
  }
}

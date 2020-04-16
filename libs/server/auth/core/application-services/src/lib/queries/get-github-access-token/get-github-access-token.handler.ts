import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenRepository,
  authTokenRepositoryFactoryToken
} from '@pimp-my-pr/server/auth/core/domain-services';
import {
  AddUserCommand,
  User,
  UserPublicFacade,
  UserRepository
} from '@pimp-my-pr/server/user/public';
import { Platform } from '@pimp-my-pr/shared/domain';
import { AuthTokenReadModel } from '../../read-models/auth-token/auth-token.read-model';
import { GetGithubAccessTokenQuery } from './get-github-access-token.query';

@QueryHandler(GetGithubAccessTokenQuery)
export class GetGithubAccessTokenHandler
  implements IQueryHandler<GetGithubAccessTokenQuery, AuthTokenReadModel> {
  private authTokenRepository: AuthTokenRepository;

  constructor(
    @Inject(authTokenRepositoryFactoryToken)
    authTokenRepositoryFactory: (platform: Platform) => AuthTokenRepository,
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private userFacade: UserPublicFacade
  ) {
    this.authTokenRepository = authTokenRepositoryFactory(Platform.github);
  }

  async execute(query: GetGithubAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { token } = await this.authTokenRepository.getAccessToken(query.githubCode);
    const userData = { ...(await this.userRepository.loadCurrentUser(token, Platform.github)) };

    let user = await this.userRepository.findById(userData.id);
    if (!user) {
      await this.userFacade.add(new AddUserCommand(userData.id, userData.name, userData.avatarUrl));
      user = await this.userRepository.getById(userData.id);
    }

    const jwtPayload = {
      token,
      user,
      platform: Platform.github
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { token: jwtToken };
  }
}

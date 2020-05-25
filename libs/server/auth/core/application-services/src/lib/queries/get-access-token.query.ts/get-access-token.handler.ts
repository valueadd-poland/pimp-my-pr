import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenRepository,
  authTokenRepositoryFactoryToken
} from '@pimp-my-pr/server/auth/core/domain-services';
import { RemoteTokenCryptoService } from '@pimp-my-pr/server/auth/port';
import { AddUserCommand, UserPublicFacade, UserRepository } from '@pimp-my-pr/server/user/public';
import { Platform } from '@pimp-my-pr/shared/domain';
import { AuthTokenReadModel } from '../../read-models/auth-token/auth-token.read-model';
import { GetAccessTokenQuery } from './get-access-tokent.query';

@QueryHandler(GetAccessTokenQuery)
export class GetAccessTokenHandler
  implements IQueryHandler<GetAccessTokenQuery, AuthTokenReadModel> {
  private authTokenRepository: AuthTokenRepository;

  constructor(
    @Inject(authTokenRepositoryFactoryToken)
    private authTokenRepositoryFactory: (platform: Platform) => AuthTokenRepository,
    private jwtService: JwtService,
    private tokenCryptoService: RemoteTokenCryptoService,
    private userRepository: UserRepository,
    private userFacade: UserPublicFacade
  ) {}

  async execute(query: GetAccessTokenQuery): Promise<AuthTokenReadModel> {
    const { code, platform } = query;
    this.authTokenRepository = this.authTokenRepositoryFactory(platform);
    const { token } = await this.authTokenRepository.getAccessToken(code);
    const userData = { ...(await this.userRepository.loadCurrentUser(token, platform)) };

    let user = await this.userRepository.findById(userData.id);
    if (!user) {
      await this.userFacade.add(new AddUserCommand(userData.id, userData.name, userData.avatarUrl));
      user = await this.userRepository.getById(userData.id);
    }

    const jwtPayload = {
      token: await this.tokenCryptoService.encrypt(token),
      user,
      platform
    };

    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return { token: jwtToken };
  }
}

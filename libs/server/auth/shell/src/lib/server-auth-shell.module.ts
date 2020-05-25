import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServerAuthCoreApplicationServicesModule } from '@pimp-my-pr/server/auth/core/application-services';
import { authTokenRepositoryFactoryToken } from '@pimp-my-pr/server/auth/core/domain-services';
import {
  authTokenRepositoryFactory,
  BitbucketAuthTokenRepository,
  GithubAuthTokenRepository,
  ServerAuthInfrastructureModule
} from '@pimp-my-pr/server/auth/infrastructure';
import { RemoteTokenCryptoService } from '@pimp-my-pr/server/auth/port';
import { PmpApiConfigService } from '@pimp-my-pr/server/shared/config';
import { ServerUserShellModule } from '@pimp-my-pr/server/user/public';
import { GitlabAuthTokenRepository } from '@pimp-my-pr/server/auth/infrastructure';
import { ServerAuthInfrastructureRemoteTokenCryptoModule } from '@pimp-my-pr/server/auth/infrastructure-remote-token-crypto';

const providers = [
  {
    provide: authTokenRepositoryFactoryToken,
    useFactory: authTokenRepositoryFactory,
    inject: [GithubAuthTokenRepository, BitbucketAuthTokenRepository, GitlabAuthTokenRepository]
  }
];

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [PmpApiConfigService],
      useFactory: (configService: PmpApiConfigService) => ({
        secret: configService.getJwtSecret()
      })
    }),
    ServerAuthInfrastructureRemoteTokenCryptoModule.registerAsync({
      useFactory: (configService: PmpApiConfigService) => ({
        key: configService.getRemoteTokenCryptoKey()
      }),
      inject: [PmpApiConfigService]
    }),
    ServerAuthInfrastructureModule,
    ServerAuthCoreApplicationServicesModule,
    ServerUserShellModule
  ],
  providers,
  exports: [
    ...providers,
    ServerAuthInfrastructureRemoteTokenCryptoModule,
    ServerUserShellModule,
    ServerAuthCoreApplicationServicesModule,
    JwtModule
  ]
})
export class ServerAuthShellModule {}

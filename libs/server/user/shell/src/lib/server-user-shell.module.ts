import { Global, Module } from '@nestjs/common';
import { ServerUserCoreApplicationServicesModule } from '@pimp-my-pr/server/user/core/application-services';
import { UserRepository } from '@pimp-my-pr/server/user/core/domain-services';
import {
  BitbucketUserRepository,
  GithubUserRepository,
  GitlabUserRepository,
  remoteUserRepositoryFactory,
  remoteUserRepositoryFactoryToken,
  ServerUserInfrastructureModule,
  UserRepositoryAdapter
} from '@pimp-my-pr/server/user/infrastructure';

const providers = [
  { provide: UserRepository, useExisting: UserRepositoryAdapter },
  {
    provide: remoteUserRepositoryFactoryToken,
    useFactory: remoteUserRepositoryFactory,
    inject: [GithubUserRepository, BitbucketUserRepository, GitlabUserRepository]
  }
];

@Global()
@Module({
  imports: [ServerUserCoreApplicationServicesModule, ServerUserInfrastructureModule],
  providers,
  exports: [...providers, ServerUserCoreApplicationServicesModule]
})
export class ServerUserShellModule {}

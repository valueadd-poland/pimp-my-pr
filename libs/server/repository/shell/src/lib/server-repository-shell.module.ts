import { Global, Module } from '@nestjs/common';

import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import {
  prRepositoryFactoryToken,
  RepositoryRepository,
  reviewerRepositoryFactoryToken,
  SettingsRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import {
  BitbucketPrRepository,
  BitbucketRepositoryRepository,
  BitbucketReviewerRepository,
  GithubPrRepository,
  GithubRepositoryRepository,
  GithubReviewerRepository,
  GitlabPrRepository,
  GitlabRepositoryRepository,
  GitlabReviewerRepository,
  remoteRepositoryRepositoryFactoryToken,
  RepositoryRepositoryAdapter,
  SettingsRepositoryAdapter,
  ServerRepositoryInfrastructureModule,
  GithubPrChangedWebHookCreator
} from '@pimp-my-pr/server/repository/infrastructure';
import { prRepositoryFactoryFactory } from './factories/pr-repository.factory';
import { remoteRepositoryRepositoryFactoryFactory } from './factories/remote-repository-repository.factory';
import { reviewerRepositoryFactoryFactory } from './factories/reviewer-repository.factory';
import { PrChangedWebHookCreator } from '@pimp-my-pr/server/repository/core/domain';

const providers = [
  {
    provide: prRepositoryFactoryToken,
    useFactory: prRepositoryFactoryFactory,
    inject: [GithubPrRepository, BitbucketPrRepository, GitlabPrRepository]
  },
  {
    provide: remoteRepositoryRepositoryFactoryToken,
    useFactory: remoteRepositoryRepositoryFactoryFactory,
    inject: [GithubRepositoryRepository, BitbucketRepositoryRepository, GitlabRepositoryRepository]
  },
  {
    provide: reviewerRepositoryFactoryToken,
    useFactory: reviewerRepositoryFactoryFactory,
    inject: [GithubReviewerRepository, BitbucketReviewerRepository, GitlabReviewerRepository]
  },
  {
    provide: RepositoryRepository,
    useClass: RepositoryRepositoryAdapter
  },
  {
    provide: PrChangedWebHookCreator,
    useExisting: GithubPrChangedWebHookCreator
  },
  {
    provide: SettingsRepository,
    useClass: SettingsRepositoryAdapter
  },

  GithubPrRepository,
  BitbucketPrRepository,
  GitlabPrRepository,
  GithubRepositoryRepository,
  BitbucketRepositoryRepository,
  GithubReviewerRepository,
  BitbucketReviewerRepository,
  GitlabReviewerRepository
];

@Global()
@Module({
  imports: [ServerRepositoryInfrastructureModule, ServerRepositoryCoreApplicationServicesModule],
  providers: providers,
  exports: [...providers, ServerRepositoryCoreApplicationServicesModule]
})
export class ServerRepositoryShellModule {}

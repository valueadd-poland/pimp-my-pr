import { Global, Module } from '@nestjs/common';

import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import {
  ContributorRepository,
  PrRepository,
  remoteContributorRepositoryFactoryToken,
  remotePrRepositoryFactoryToken,
  RepositoryRepository,
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
  ServerRepositoryInfrastructureModule
} from '@pimp-my-pr/server/repository/infrastructure';
import { prRepositoryFactoryFactory } from './factories/pr-repository.factory';
import { remoteRepositoryRepositoryFactoryFactory } from './factories/remote-repository-repository.factory';
import { reviewerRepositoryFactoryFactory } from './factories/reviewer-repository.factory';
import { PrRepositoryAdapter } from '@pimp-my-pr/server/repository/infrastructure';
import { ContributorRepositoryAdapter } from '@pimp-my-pr/server/repository/infrastructure';

const providers = [
  {
    provide: remotePrRepositoryFactoryToken,
    useFactory: prRepositoryFactoryFactory,
    inject: [GithubPrRepository, BitbucketPrRepository, GitlabPrRepository]
  },
  {
    provide: remoteRepositoryRepositoryFactoryToken,
    useFactory: remoteRepositoryRepositoryFactoryFactory,
    inject: [GithubRepositoryRepository, BitbucketRepositoryRepository, GitlabRepositoryRepository]
  },
  {
    provide: remoteContributorRepositoryFactoryToken,
    useFactory: reviewerRepositoryFactoryFactory,
    inject: [GithubReviewerRepository, BitbucketReviewerRepository, GitlabReviewerRepository]
  },
  {
    provide: RepositoryRepository,
    useClass: RepositoryRepositoryAdapter
  },
  {
    provide: SettingsRepository,
    useClass: SettingsRepositoryAdapter
  },
  {
    provide: PrRepository,
    useClass: PrRepositoryAdapter
  },
  {
    provide: ContributorRepository,
    useClass: ContributorRepositoryAdapter
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

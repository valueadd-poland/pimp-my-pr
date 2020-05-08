import { Global, Module } from '@nestjs/common';

import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import {
  prRepositoryFactoryToken,
  RepositoryRepository,
  reviewerRepositoryFactoryToken
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
  ServerRepositoryInfrastructureModule
} from '@pimp-my-pr/server/repository/infrastructure';
import { prRepositoryFactoryFactory } from './factories/pr-repository.factory';
import { remoteRepositoryRepositoryFactoryFactory } from './factories/remote-repository-repository.factory';
import { reviewerRepositoryFactoryFactory } from './factories/reviewer-repository.factory';

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

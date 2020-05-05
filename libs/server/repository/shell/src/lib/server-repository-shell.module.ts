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
  GitlabRepositoryRepository,
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
    inject: [GithubPrRepository, BitbucketPrRepository]
  },
  {
    provide: remoteRepositoryRepositoryFactoryToken,
    useFactory: remoteRepositoryRepositoryFactoryFactory,
    inject: [GithubRepositoryRepository, BitbucketRepositoryRepository, GitlabRepositoryRepository]
  },
  {
    provide: reviewerRepositoryFactoryToken,
    useFactory: reviewerRepositoryFactoryFactory,
    inject: [GithubReviewerRepository, BitbucketReviewerRepository]
  },
  {
    provide: RepositoryRepository,
    useClass: RepositoryRepositoryAdapter
  },

  GithubPrRepository,
  BitbucketPrRepository,
  GithubRepositoryRepository,
  BitbucketRepositoryRepository,
  GithubReviewerRepository,
  BitbucketReviewerRepository
];

@Global()
@Module({
  imports: [ServerRepositoryInfrastructureModule, ServerRepositoryCoreApplicationServicesModule],
  providers: providers,
  exports: [...providers, ServerRepositoryCoreApplicationServicesModule]
})
export class ServerRepositoryShellModule {}

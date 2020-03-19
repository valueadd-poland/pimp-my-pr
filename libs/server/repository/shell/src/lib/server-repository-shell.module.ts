import { Global, Module } from '@nestjs/common';

import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import {
  RepositoryRepository,
  prRepositoryFactoryToken,
  reviewerRepositoryFactoryToken
} from '@pimp-my-pr/server/repository/core/domain-services';
import {
  RepositoryRepositoryAdapter,
  ServerRepositoryInfrastructureModule,
  remoteRepositoryRepositoryFactoryToken,
  GithubPrRepository,
  BitbucketPrRepository,
  GithubRepositoryRepository,
  BitbucketRepositoryRepository,
  GithubReviewerRepository,
  BitbucketReviewerRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { FeatureRepositoryTypeOrmModule } from './feature-repository-type-orm.module';
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
    inject: [GithubRepositoryRepository, BitbucketRepositoryRepository]
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
  imports: [
    FeatureRepositoryTypeOrmModule,
    ServerRepositoryInfrastructureModule,
    ServerRepositoryCoreApplicationServicesModule
  ],
  providers: providers,
  exports: [
    FeatureRepositoryTypeOrmModule,
    ...providers,
    ServerRepositoryCoreApplicationServicesModule
  ]
})
export class ServerRepositoryShellModule {}

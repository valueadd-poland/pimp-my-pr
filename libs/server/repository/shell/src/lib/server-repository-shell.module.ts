import { Global, Module } from '@nestjs/common';
import {
  PrRepository,
  RepositoryRepository,
  ReviewerRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import {
  GithubPrRepository,
  GithubReviewerRepository,
  RepositoryRepositoryAdapter,
  ServerRepositoryInfrastructureModule
} from '@pimp-my-pr/server/repository/infrastructure';
import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import { FeatureRepositoryTypeOrmModule } from './feature-repository-type-orm.module';

const providers = [
  { provide: PrRepository, useClass: GithubPrRepository },
  {
    provide: RepositoryRepository,
    useClass: RepositoryRepositoryAdapter
  },
  { provide: ReviewerRepository, useClass: GithubReviewerRepository }
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

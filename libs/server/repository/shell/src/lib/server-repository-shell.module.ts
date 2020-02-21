import { Global, Module } from '@nestjs/common';
import {
  PrRepository,
  RepositoryRepository,
  ReviewerRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import {
  GithubPrRepository,
  GithubRepositoryRepository,
  GithubReviewerRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';

const providers = [
  { provide: PrRepository, useClass: GithubPrRepository },
  {
    provide: RepositoryRepository,
    useClass: GithubRepositoryRepository
  },
  { provide: ReviewerRepository, useClass: GithubReviewerRepository }
];

@Global()
@Module({
  imports: [ServerRepositoryCoreApplicationServicesModule],
  providers: providers,
  exports: [...providers, ServerRepositoryCoreApplicationServicesModule]
})
export class ServerRepositoryShellModule {}

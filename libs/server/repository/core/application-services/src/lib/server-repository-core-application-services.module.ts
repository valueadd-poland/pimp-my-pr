import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryPrsStatisticsReadModelFactory } from '@pimp-my-pr/server/repository/core/domain';
import { ServerRepositoryInfrastructureModule } from '@pimp-my-pr/server/repository/infrastructure';
import { GetPrDetailsHandler } from './queries/handlers/get-pr-details.handler';
import { GetRepositoryPrsHandler } from './queries/handlers/get-repository-prs.handler';
import { GetUserPrsHandler } from './queries/handlers/get-user-prs.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { ListRepositoriesHandler } from './queries/handlers/list-repositories.handler';
import { ListRepositoryContributorsHandler } from './queries/handlers/list-repository-contributors.handler';
import { ListRepositoryReviewersHandler } from './queries/handlers/list-repository-reviewers.handler';
import { ListReviewerStatisticsHandler } from './queries/handlers/list-reviewer-statistics.handler';
import { ListSingleRepositoryHandler } from './queries/handlers/list-single-repository.handler';
import { RepositoryFacade } from './repository.facade';

const QueryHandlers = [
  ListRepositoriesHandler,
  ListSingleRepositoryHandler,
  ListRepositoryContributorsHandler,
  ListRepositoryReviewersHandler,
  ListReviewerStatisticsHandler,
  GetRepositoryPrsHandler,
  GetPrDetailsHandler,
  GetUserPrsHandler,
  GetUserHandler
];

@Module({
  imports: [CqrsModule, ServerRepositoryInfrastructureModule],
  providers: [RepositoryFacade, RepositoryPrsStatisticsReadModelFactory, ...QueryHandlers],
  exports: [RepositoryFacade]
})
export class ServerRepositoryCoreApplicationServicesModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryFacade } from './repository.facade';
import { ListRepositoriesHandler } from './queries/handlers/list-repositories.handler';
import { PmpApiApiServiceRepositoryDataAccessModule } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetRepositoryPrsHandler } from './queries/handlers/get-repository-prs.handler';
import { GetPrChangesHandler } from './queries/handlers/get-pr-changes.handler';
import { GetUserPrsHandler } from './queries/handlers/get-user-prs.handler';
import { ListRepositoryContributorsHandler } from './queries/handlers/list-repository-contributors.handler';
import { PrsService } from './services/prs.service';
import { ListRepositoryReviewersHandler } from './queries/handlers/list-repository-reviewers.handler';
import { GetPrDetailsHandler } from './queries/handlers/get-pr-details.handler';
import { ListReviewerStatisticsHandler } from './queries/handlers/list-reviewer-statistics.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { RepositoryPrsStatisticsReadModelFactory } from '@pimp-my-pr/pmp-api/api-service/repository/domain';

const QueryHandlers = [
  ListRepositoriesHandler,
  ListRepositoryContributorsHandler,
  ListRepositoryReviewersHandler,
  ListReviewerStatisticsHandler,
  GetRepositoryPrsHandler,
  GetPrChangesHandler,
  GetPrDetailsHandler,
  GetUserPrsHandler,
  GetUserHandler
];

@Module({
  imports: [CqrsModule, PmpApiApiServiceRepositoryDataAccessModule],
  providers: [
    RepositoryFacade,
    PrsService,
    RepositoryPrsStatisticsReadModelFactory,
    ...QueryHandlers
  ],
  exports: [RepositoryFacade]
})
export class PmpApiApiServiceRepositoryCoreModule {}

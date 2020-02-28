import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ListRepositoriesStatisticsHandler } from './queries/list-repositories-statistics/list-repositories-statistics.handler';
import { ListReviewersStatisticsHandler } from './queries/list-reviewers-statistics/list-reviewers-statistics.handler';
import { GetReviewerStatisticsHandler } from './queries/get-reviewer-statistics/get-reviewer-statistics.handler';
import { GetRepositoryStatisticsHandler } from './queries/get-repository-statistics/get-repository-statistics.handler';
import { RepositoryFacade } from './repository.facade';
import { AddRepositoryHandler } from './commands/add-repository/add-repository.handler';

const QueryHandlers = [
  AddRepositoryHandler,
  GetRepositoryStatisticsHandler,
  GetReviewerStatisticsHandler,
  ListRepositoriesStatisticsHandler,
  ListReviewersStatisticsHandler
];

@Module({
  imports: [CqrsModule],
  providers: [RepositoryFacade, ...QueryHandlers],
  exports: [RepositoryFacade]
})
export class ServerRepositoryCoreApplicationServicesModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddRepositoryHandler } from './commands/add-repository/add-repository.handler';
import { GetRepositoryStatisticsHandler } from './queries/get-repository-statistics/get-repository-statistics.handler';
import { GetReviewerStatisticsHandler } from './queries/get-reviewer-statistics/get-reviewer-statistics.handler';
import { ListRepositoriesStatisticsHandler } from './queries/list-repositories-statistics/list-repositories-statistics.handler';
import { ListRepositoriesHandler } from './queries/list-repositories/list-repositories.handler';
import { ListReviewersStatisticsHandler } from './queries/list-reviewers-statistics/list-reviewers-statistics.handler';
import { RepositoryFacade } from './repository.facade';
import { DeleteRepositoryHandler } from './commands/delete-repository/delete-repository.handler';
import { EditRepositoryHandler } from './commands/edit-repository/edit-repository.handler';

const QueryHandlers = [
  AddRepositoryHandler,
  DeleteRepositoryHandler,
  EditRepositoryHandler,
  GetRepositoryStatisticsHandler,
  GetReviewerStatisticsHandler,
  ListRepositoriesStatisticsHandler,
  ListReviewersStatisticsHandler,
  ListRepositoriesHandler
];

@Module({
  imports: [CqrsModule],
  providers: [RepositoryFacade, ...QueryHandlers],
  exports: [RepositoryFacade]
})
export class ServerRepositoryCoreApplicationServicesModule {}

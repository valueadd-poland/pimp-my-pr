import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryFacade } from './repository.facade';
import { ListRepositoriesHandler } from './queries/handlers/list-repositories.handler';
import { PmpApiApiServiceRepositoryDataAccessModule } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetRepositoryPrsHandler } from './queries/handlers/get-repository-prs.handler';
import { GetPrChangesHandler } from './queries/handlers/get-pr-changes.handler';

const QueryHandlers = [
  ListRepositoriesHandler,
  GetRepositoryPrsHandler,
  GetPrChangesHandler
];

@Module({
  imports: [CqrsModule, PmpApiApiServiceRepositoryDataAccessModule],
  providers: [RepositoryFacade, ...QueryHandlers],
  exports: [RepositoryFacade]
})
export class PmpApiApiServiceRepositoryCoreModule {}

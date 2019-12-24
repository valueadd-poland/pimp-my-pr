import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryFacade } from './repository.facade';
import { ListRepositoriesHandler } from './queries/handlers/list-repositories.handler';
import { PmpApiApiServiceRepositoryDataAccessModule } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetRepositoryPrsHandler } from './queries/handlers/get-repository-prs.handler';
import { GetPrChangesHandler } from './queries/handlers/get-pr-changes.handler';
import { GetUserPrsHandler } from './queries/handlers/get-user-prs.handler';
import { ListRepositoryUsersHandler } from './queries/handlers/list-repository-users.handler';
import { PrsService } from './services/prs.service';

const QueryHandlers = [
  ListRepositoriesHandler,
  ListRepositoryUsersHandler,
  GetRepositoryPrsHandler,
  GetPrChangesHandler,
  GetUserPrsHandler
];

@Module({
  imports: [CqrsModule, PmpApiApiServiceRepositoryDataAccessModule],
  providers: [RepositoryFacade, PrsService, ...QueryHandlers],
  exports: [RepositoryFacade]
})
export class PmpApiApiServiceRepositoryCoreModule {}

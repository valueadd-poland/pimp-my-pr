import { Module } from '@nestjs/common';
import { ProjectFacade } from './project.facade';
import { SynchronizeProjectsHandler } from './commands/handlers/synchronize-projects.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProjectHandler } from './commands/handlers/create-project.handler';
import { GetAllExternalProjectsHandler } from './queries/handlers/get-all-external-projects.handler';
import { PmpApiProjectDataAccessModule } from '@pimp-my-pr/pmp-api/project/data-access';
import { GetAllExternalPRsHandler } from './queries/handlers/get-all-external-prs.handler';
import { CreatePRHandler } from './commands/handlers/create-pr.handler';

const CommandHandlers = [
  SynchronizeProjectsHandler,
  CreatePRHandler,
  CreateProjectHandler
];
const QueryHandlers = [GetAllExternalProjectsHandler, GetAllExternalPRsHandler];

@Module({
  imports: [CqrsModule, PmpApiProjectDataAccessModule],
  providers: [ProjectFacade, ...CommandHandlers, ...QueryHandlers],
  exports: [ProjectFacade]
})
export class PmpApiProjectCoreModule {}

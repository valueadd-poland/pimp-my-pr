import { Module } from '@nestjs/common';
import { ProjectFacade } from './project.facade';
import { SynchronizeProjectsHandler } from './handlers/synchronize-projects.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProjectHandler } from './handlers/create-project.handler';
import { GetAllExternalProjectsHandler } from './handlers/get-all-external-projects.handler';
import { ProjectRepository } from '@pimp-my-pr/pmp-api/project/domain';
import {
  PmpApiProjectDataAccessModule,
  ProjectRepositoryImpl
} from '@pimp-my-pr/pmp-api/project/data-access';

const CommandHandlers = [SynchronizeProjectsHandler, CreateProjectHandler];
const QueryHandlers = [GetAllExternalProjectsHandler];

@Module({
  imports: [CqrsModule, PmpApiProjectDataAccessModule],
  providers: [
    ProjectFacade,
    { provide: ProjectRepository, useClass: ProjectRepositoryImpl },
    ...CommandHandlers,
    ...QueryHandlers
  ],
  exports: [ProjectFacade]
})
export class PmpApiProjectCoreModule {}

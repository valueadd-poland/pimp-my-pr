import { Module } from '@nestjs/common';
import { ProjectFacade } from './project.facade';
import { SynchronizeProjectsHandler } from './handlers/synchronize-projects.handler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [SynchronizeProjectsHandler];

@Module({
  imports: [CqrsModule],
  providers: [ProjectFacade, ...CommandHandlers],
  exports: [ProjectFacade]
})
export class PmpApiProjectCoreModule {}

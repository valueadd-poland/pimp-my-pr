import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from './commands/synchronize-projects.command';
import { Project } from '@pimp-my-pr/pmp-api/project/domain';
import { GetAllExternalProjectsQuery } from './queries/get-all-external-projects.query';
import { CreateProjectCommand } from './commands/create-project.command';

@Injectable()
export class ProjectFacade {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async createProject(command: CreateProjectCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }
  async getAllExternalProjects(): Promise<Project[]> {
    return this.queryBus.execute(new GetAllExternalProjectsQuery());
  }

  async sync(): Promise<void> {
    return this.commandBus.execute(new SynchronizeProjectsCommand());
  }
}

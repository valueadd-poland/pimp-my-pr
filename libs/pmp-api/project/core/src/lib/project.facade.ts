import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from './commands/synchronize-projects.command';
import { PR, Project } from '@pimp-my-pr/pmp-api/project/domain';
import { GetAllExternalProjectsQuery } from './queries/get-all-external-projects.query';
import { CreateProjectCommand } from './commands/create-project.command';
import { GetAllExternalPRsQuery } from './queries/get-all-external-prs.query';
import { CreatePRCommand } from './commands/create-pr.command';

@Injectable()
export class ProjectFacade {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async createPR(command: CreatePRCommand) {
    return this.commandBus.execute(command);
  }

  async createProject(command: CreateProjectCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  async getAllExternalProjects(
    query: GetAllExternalProjectsQuery
  ): Promise<Project[]> {
    return this.queryBus.execute(query);
  }

  async getAllExternalPRs(query: GetAllExternalPRsQuery): Promise<PR[]> {
    return this.queryBus.execute(query);
  }

  async sync(): Promise<void> {
    return this.commandBus.execute(new SynchronizeProjectsCommand());
  }
}

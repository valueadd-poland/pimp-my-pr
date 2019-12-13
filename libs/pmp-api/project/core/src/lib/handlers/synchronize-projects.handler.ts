import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from '../commands/synchronize-projects.command';
import { CreateProjectCommand } from '../commands/create-project.command';
import { ProjectFacade } from '../project.facade';
import { GetAllExternalProjectsQuery } from '../queries/get-all-external-projects.query';

@CommandHandler(SynchronizeProjectsCommand)
export class SynchronizeProjectsHandler
  implements ICommandHandler<SynchronizeProjectsCommand> {
  constructor(private projectFacade: ProjectFacade) {}

  async execute(command: SynchronizeProjectsCommand): Promise<void> {
    // TODO get access tokens
    const projects = await this.projectFacade.getAllExternalProjects(
      new GetAllExternalProjectsQuery({})
    );
    for (const project of projects) {
      await this.projectFacade.createProject(new CreateProjectCommand(project));
    }
  }
}

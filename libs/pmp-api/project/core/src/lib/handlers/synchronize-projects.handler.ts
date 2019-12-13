import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from '../commands/synchronize-projects.command';
import { CreateProjectCommand } from '../commands/create-project.command';
import { ProjectFacade } from '../project.facade';

@CommandHandler(SynchronizeProjectsCommand)
export class SynchronizeProjectsHandler
  implements ICommandHandler<SynchronizeProjectsCommand> {
  constructor(private projectFacade: ProjectFacade) {}

  async execute(command: SynchronizeProjectsCommand): Promise<void> {
    const projects = await this.projectFacade.getAllExternalProjects();
    for (const project of projects) {
      await this.projectFacade.createProject(new CreateProjectCommand(project));
    }
  }
}

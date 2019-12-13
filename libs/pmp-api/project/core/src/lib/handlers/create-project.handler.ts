import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../commands/create-project.command';
import { ProjectRepository } from '@pimp-my-pr/pmp-api/project/domain';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand> {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(command: CreateProjectCommand): Promise<unknown> {
    return this.projectRepository.createProject(command.project);
  }
}

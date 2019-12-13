import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from '../commands/synchronize-projects.command';

@CommandHandler(SynchronizeProjectsCommand)
export class SynchronizeProjectsHandler
  implements ICommandHandler<SynchronizeProjectsCommand> {
  async execute(command: SynchronizeProjectsCommand): Promise<any> {
    // ToDo don't live like that
    return { hello: 'World' };
  }
}

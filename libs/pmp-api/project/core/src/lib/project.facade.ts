import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from './commands/synchronize-projects.command';

@Injectable()
export class ProjectFacade {
  constructor(private commandBus: CommandBus) {}

  async sync(): Promise<unknown> {
    return this.commandBus.execute(new SynchronizeProjectsCommand());
  }
}

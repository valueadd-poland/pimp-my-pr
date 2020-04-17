import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddUserCommand } from './commands/add-user/add-user.command';

@Injectable()
export class UserFacade {
  constructor(private commandBus: CommandBus) {}

  addUser(command: AddUserCommand): Promise<void> {
    return this.commandBus.execute(command);
  }
}

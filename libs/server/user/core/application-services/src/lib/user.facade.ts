import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddUserCommand } from './commands/add-user/add-user.command';
import { GetUserInfoQuery } from './queries/get-user-info/get-user-info.query';
import { User } from '@pimp-my-pr/server/user/core/domain';

@Injectable()
export class UserFacade {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  addUser(command: AddUserCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  getUserInfo(query: GetUserInfoQuery): Promise<User> {
    return this.queryBus.execute(query);
  }
}

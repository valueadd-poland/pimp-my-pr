import { Injectable } from '@nestjs/common';
import { AddUserCommand, UserFacade } from '@pimp-my-pr/server/user/core/application-services';

@Injectable()
export class UserPublicFacade {
  constructor(private userFacade: UserFacade) {}

  add(command: AddUserCommand): Promise<void> {
    return this.userFacade.addUser(command);
  }
}

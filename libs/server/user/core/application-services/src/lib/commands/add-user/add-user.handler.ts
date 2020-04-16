import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { UserRepository } from '@pimp-my-pr/server/user/core/domain-services';
import { AddUserCommand } from './add-user.command';

@CommandHandler(AddUserCommand)
export class AddUserHandler implements ICommandHandler<AddUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async execute(command: AddUserCommand): Promise<void> {
    const { id, name, avatarUrl } = command;

    const user = new User(id, name, avatarUrl);

    await this.userRepository.save(user);
  }
}

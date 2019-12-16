import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePRCommand } from '../create-pr.command';
import { PRRepository } from '@pimp-my-pr/pmp-api/project/data-access';

@CommandHandler(CreatePRCommand)
export class CreatePRHandler implements ICommandHandler<CreatePRCommand> {
  constructor(private projectRepository: PRRepository) {}

  async execute(command: CreatePRCommand): Promise<unknown> {
    return this.projectRepository.createPR(command.pr);
  }
}

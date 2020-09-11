import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSettingCommand } from './delete-setting.command';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';

@CommandHandler(DeleteSettingCommand)
export class DeleteSettingHandler implements ICommandHandler<DeleteSettingCommand> {
  constructor(private settingRepository: SettingsRepository) {}

  async execute(command: DeleteSettingCommand): Promise<void> {
    const { id } = command;
    const entity = await this.settingRepository.getById(id);
    await this.settingRepository.delete(entity);
  }
}

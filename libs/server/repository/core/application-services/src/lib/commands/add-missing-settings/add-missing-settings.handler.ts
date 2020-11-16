import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  defaultSettingFactory,
  getMissingSettings
} from '@pimp-my-pr/server/repository/core/domain';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { AddMissingSettingsCommand } from './add-missing-settings.command';

@CommandHandler(AddMissingSettingsCommand)
export class AddMissingSettingsHandler implements ICommandHandler<AddMissingSettingsCommand> {
  constructor(private settingsRepo: SettingsRepository) {}

  async execute(command: AddMissingSettingsCommand): Promise<void[]> {
    const { userId } = command;
    const result = await this.settingsRepo.getByUser(userId);
    const missing = getMissingSettings(result);
    return Promise.all(
      missing.map(miss => this.settingsRepo.save(defaultSettingFactory(miss, userId)))
    );
  }
}

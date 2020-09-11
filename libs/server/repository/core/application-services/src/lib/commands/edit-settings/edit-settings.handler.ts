import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditSettingsCommand } from './edit-settings.command';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { SettingInvalidValueException } from '@pimp-my-pr/server/repository/core/domain';

@CommandHandler(EditSettingsCommand)
export class EditSettingsHandler implements ICommandHandler<EditSettingsCommand> {
  constructor(private settingsRepository: SettingsRepository) {}

  async execute(command: EditSettingsCommand): Promise<void> {
    for (const patch of command.patch) {
      const { id, value } = patch;
      const entity = await this.settingsRepository.getById(id);
      entity.edit({ value });

      if (!entity.validate()) {
        throw new SettingInvalidValueException(entity.value, entity.settingType);
      }

      await this.settingsRepository.save(entity);
    }
  }
}

import { ICommand } from '@nestjs/cqrs';
import { SettingPatchEntity } from '@pimp-my-pr/server/repository/core/domain';

export class EditSettingsCommand implements ICommand {
  constructor(public patch: SettingPatchEntity[]) {}
}

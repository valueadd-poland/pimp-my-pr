import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteSettingCommand } from './commands/delete-setting/delete-setting.command';
import { GetUserSettingsReadModel } from './queries/get-user-settings/get-user-settings.read-model';
import { GetUserSettingsQuery } from './queries/get-user-settings/get-user-settings.query';
import { EditSettingsCommand } from './commands/edit-settings/edit-settings.command';
import { AddMissingSettingsCommand } from './commands/add-missing-settings/add-missing-settings.command';

@Injectable()
export class SettingsFacade {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  deleteSetting(command: DeleteSettingCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  editSettings(command: EditSettingsCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  async getSettings(userId: string): Promise<GetUserSettingsReadModel[]> {
    await this.commandBus.execute(new AddMissingSettingsCommand(userId));
    return await this.queryBus.execute(new GetUserSettingsQuery(userId));
  }
}

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserSettingsQuery } from './get-user-settings.query';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { GetUserSettingsReadModel } from './get-user-settings.read-model';
import { settingReadModelFactory } from '../../read-models/factories/setting-read-model.factory';

@QueryHandler(GetUserSettingsQuery)
export class GetUserSettingsHandler implements IQueryHandler<GetUserSettingsQuery> {
  constructor(private settingsRepo: SettingsRepository) {}

  async execute(query: GetUserSettingsQuery): Promise<GetUserSettingsReadModel[]> {
    const { userId } = query;
    const result = await this.settingsRepo.getByUser(userId);
    return result.map(entity => settingReadModelFactory(entity));
  }
}

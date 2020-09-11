import { SettingEntity } from '@pimp-my-pr/server/repository/core/domain';

export abstract class SettingsRepository {
  abstract getById(id: string): Promise<SettingEntity>;

  abstract getByUser(userId: string): Promise<SettingEntity[]>;

  abstract delete(entity: SettingEntity): Promise<void>;

  abstract save(entity: SettingEntity): Promise<void>;
}

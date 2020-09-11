import { SettingEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GetUserSettingsReadModel } from '../../queries/get-user-settings/get-user-settings.read-model';

export const settingReadModelFactory = (entity: SettingEntity): GetUserSettingsReadModel => {
  const readModel = new GetUserSettingsReadModel();
  readModel.id = entity.id;
  readModel.value = entity.typedValue;
  readModel.key = entity.settingType;
  readModel.type = entity.type;
  readModel.validators = entity.getValidators();

  return readModel;
};

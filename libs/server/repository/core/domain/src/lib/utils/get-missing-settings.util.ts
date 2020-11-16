import { SettingEntity } from '../entities/setting.entity';
import { REQUIRED_USER_SETTINGS } from '../consts/required-user-settings.const';

export const getMissingSettings = (settings: SettingEntity[]) => {
  return REQUIRED_USER_SETTINGS.filter(setting => !settings.find(s => s.settingType === setting));
};

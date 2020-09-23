import { SettingEntity } from '../entities/setting.entity';
import { MaxPendingPrSettingEntity } from '../entities/common-settings/max-pending-pr-setting.entity';
import { MaxTimePrWaitingSettingEntity } from '../entities/common-settings/max-time-pr-waiting-setting.entity';
import { TypeormRawSetting } from '../interfaces/typeorm-raw-setting.interface';
import { MaxLinesToCheckSettingEntity } from '../entities/common-settings/max-lines-to-check-setting.entity';

export const commonSettingsEntityFactory = (entityData: TypeormRawSetting): SettingEntity => {
  let product: SettingEntity;
  switch (entityData.setting_settingType) {
    case MaxPendingPrSettingEntity.Type:
      product = new MaxPendingPrSettingEntity(entityData.setting_userId);
      break;
    case MaxTimePrWaitingSettingEntity.Type:
      product = new MaxTimePrWaitingSettingEntity(entityData.setting_userId);
      break;
    case MaxLinesToCheckSettingEntity.Type:
      product = new MaxLinesToCheckSettingEntity(entityData.setting_userId);
      break;
  }
  product.id = entityData.setting_id;
  product.value = entityData.setting_value;

  return product;
};

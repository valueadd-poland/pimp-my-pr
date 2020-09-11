import { RepositoryCommonSettingValidator } from '../enums/repository-common-setting-validator.enum';

export interface RepositoryCommonSettingValidatorConfig {
  validator: RepositoryCommonSettingValidator;
  args: Array<string | number>;
}

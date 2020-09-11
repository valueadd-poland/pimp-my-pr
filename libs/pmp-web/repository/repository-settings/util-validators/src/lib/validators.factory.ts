import {
  RepositoryCommonSettingValidator,
  RepositoryCommonSettingValidatorConfig
} from '@pimp-my-pr/shared/domain';
import { ValidatorFn, Validators } from '@angular/forms';
import { integerValidator } from './validators';

export const validatorsFactory = (
  validator: RepositoryCommonSettingValidatorConfig
): ValidatorFn => {
  switch (validator.validator) {
    case RepositoryCommonSettingValidator.INTEGER:
      return integerValidator;
    case RepositoryCommonSettingValidator.MAX:
      return Validators.max(validator.args[0] as number);
    case RepositoryCommonSettingValidator.MIN:
      return Validators.min(validator.args[0] as number);
    case RepositoryCommonSettingValidator.REQUIRED:
      return Validators.required;
    case RepositoryCommonSettingValidator.MAX_LENGTH:
      return Validators.maxLength(validator.args[0] as number);
    case RepositoryCommonSettingValidator.MIN_LENGTH:
      return Validators.minLength(validator.args[0] as number);
    case RepositoryCommonSettingValidator.PATTERN:
      return Validators.pattern(validator.args[0] as string);
  }
};

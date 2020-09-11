import { integerValidator } from './validators';
import { Validators } from '@angular/forms';
import { validatorsFactory } from '@pimp-my-pr/pmp-web/repository/repository-settings/util-validators';
import { RepositoryCommonSettingValidator } from '@pimp-my-pr/shared/domain';

describe('Repository settings validators factory', () => {
  beforeEach(() => {
    spyOn(Validators, 'required');
    spyOn(Validators, 'min');
    spyOn(Validators, 'max');
    spyOn(Validators, 'minLength');
    spyOn(Validators, 'maxLength');
    spyOn(Validators, 'pattern');
  });

  it('should produce integer validator', () => {
    expect(
      validatorsFactory({ validator: RepositoryCommonSettingValidator.INTEGER, args: [] })
    ).toEqual(integerValidator);
  });

  it('should produce required validator', () => {
    expect(
      validatorsFactory({ validator: RepositoryCommonSettingValidator.REQUIRED, args: [] })
    ).toEqual(Validators.required);
  });

  it('should produce min validator', () => {
    validatorsFactory({ validator: RepositoryCommonSettingValidator.MIN, args: [10] });
    expect(Validators.min).toHaveBeenCalledWith(10);
  });

  it('should produce max validator', () => {
    validatorsFactory({ validator: RepositoryCommonSettingValidator.MAX, args: [10] });
    expect(Validators.max).toHaveBeenCalledWith(10);
  });

  it('should produce minLength validator', () => {
    validatorsFactory({ validator: RepositoryCommonSettingValidator.MIN_LENGTH, args: [10] });
    expect(Validators.minLength).toHaveBeenCalledWith(10);
  });

  it('should produce maxLength validator', () => {
    validatorsFactory({ validator: RepositoryCommonSettingValidator.MAX_LENGTH, args: [10] });
    expect(Validators.maxLength).toHaveBeenCalledWith(10);
  });

  it('should produce pattern validator', () => {
    validatorsFactory({ validator: RepositoryCommonSettingValidator.PATTERN, args: ['xxxx'] });
    expect(Validators.pattern).toHaveBeenCalledWith('xxxx');
  });
});

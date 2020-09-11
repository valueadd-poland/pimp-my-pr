import { CoreUnprocessableEntityException } from '@pimp-my-pr/server/shared/domain';

export class SettingInvalidValueException extends CoreUnprocessableEntityException {
  constructor(value: string, forKey: string) {
    super(`Invalid value ${value} of field ${forKey}`);
  }
}

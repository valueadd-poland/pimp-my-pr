import { CoreUnprocessableEntityException } from '@pimp-my-pr/server/shared/domain';

export class InvalidTimelineParametersException extends CoreUnprocessableEntityException {
  constructor(paramName: string) {
    super(`Invalid ${paramName}`);
  }
}

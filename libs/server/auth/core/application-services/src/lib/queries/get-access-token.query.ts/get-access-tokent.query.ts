import { IQuery } from '@nestjs/cqrs';
import { Platform } from '@pimp-my-pr/shared/domain';

export class GetAccessTokenQuery implements IQuery {
  constructor(public code: string, public platform: Platform) {}
}

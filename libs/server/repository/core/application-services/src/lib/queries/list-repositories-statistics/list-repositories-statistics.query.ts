import { IQuery } from '@nestjs/cqrs';
import { Platform } from '@pimp-my-pr/shared/domain';

export class ListRepositoriesStatisticsQuery implements IQuery {
  constructor(public token: string, public platform: Platform) {}
}

import { IQuery } from '@nestjs/cqrs';
import { Platform } from '@pimp-my-pr/shared/domain';

export class GetReviewerStatisticsQuery implements IQuery {
  constructor(
    public reviewerId: string,
    public token: string,
    public platform: Platform,
    public userId: string
  ) {}
}

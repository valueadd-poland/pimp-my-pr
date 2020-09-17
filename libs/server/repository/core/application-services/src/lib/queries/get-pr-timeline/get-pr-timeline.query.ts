import { IQuery } from '@nestjs/cqrs';
import { Platform, TimelineStep } from '@pimp-my-pr/shared/domain';

export class GetPrTimelineQuery implements IQuery {
  constructor(
    public step: TimelineStep,
    public timelineFrom: Date,
    public timelineTo: Date,
    public token: string,
    public repositoryId: string,
    public platform: Platform,
    public createdAfter: Date
  ) {}
}

import { QueryBus } from '@nestjs/cqrs';
import { GetPrTimelineQuery } from './queries/get-pr-timeline/get-pr-timeline.query';
import { PrTimelineReadModel } from './queries/get-pr-timeline/pr-timeline.read-model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimelineFacade {
  constructor(private queryBus: QueryBus) {}

  getPrTimeLine(query: GetPrTimelineQuery): Promise<PrTimelineReadModel> {
    return this.queryBus.execute(query);
  }
}

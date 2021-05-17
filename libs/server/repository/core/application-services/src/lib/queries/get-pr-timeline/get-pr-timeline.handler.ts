import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPrTimelineQuery } from './get-pr-timeline.query';
import { PrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { PrTimelineReadModel } from './pr-timeline.read-model';
import {
  getTimeLineHistory,
  InvalidTimelineParametersException
} from '@pimp-my-pr/server/repository/core/domain';
import { prTimelineModelFactory } from '../../read-models/factories/pr-timeline-model.factory';
import { getStepsCount } from '@pimp-my-pr/server/repository/util';

@QueryHandler(GetPrTimelineQuery)
export class GetPrTimelineHandler implements IQueryHandler<GetPrTimelineQuery> {
  constructor(private prRepository: PrRepository) {}

  async execute(query: GetPrTimelineQuery): Promise<PrTimelineReadModel> {
    const { repositoryId, step, timelineFrom, timelineTo, token, platform, createdAfter } = query;

    const prs = await this.prRepository.findByRepositoryId(repositoryId);
    const stepsCount = getStepsCount(timelineFrom, timelineTo, step);
    if (stepsCount === 0) throw new InvalidTimelineParametersException('timelineFrom');

    const records = getTimeLineHistory(prs, step, timelineTo, stepsCount);
    return prTimelineModelFactory(records, query, prs.length);
  }
}

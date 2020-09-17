import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPrTimelineQuery } from './get-pr-timeline.query';
import {
  PrRepository,
  prRepositoryFactoryToken,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { PrTimelineReadModel } from '@pimp-my-pr/server/repository/core/application-services';
import {
  getTimeLineHistory,
  InvalidTimelineParametersException,
  PrEntity,
  PrState
} from '@pimp-my-pr/server/repository/core/domain';
import { prTimelineModelFactory } from '../../read-models/factories/pr-timeline-model.factory';
import { Inject } from '@nestjs/common';
import { Platform } from '@pimp-my-pr/shared/domain';
import { getStepsCount, traversePagesUntil } from '@pimp-my-pr/server/repository/util';

@QueryHandler(GetPrTimelineQuery)
export class GetPrTimelineHandler implements IQueryHandler<GetPrTimelineQuery> {
  constructor(
    @Inject(prRepositoryFactoryToken)
    private prRepositoryFactory: (platform: Platform) => PrRepository,
    private repoRepository: RepositoryRepository
  ) {}

  async execute(query: GetPrTimelineQuery): Promise<PrTimelineReadModel> {
    const { repositoryId, step, timelineFrom, timelineTo, token, platform, createdAfter } = query;
    const { fullName } = await this.repoRepository.getById(repositoryId);
    const prRepository = this.prRepositoryFactory(platform);

    const prs = await traversePagesUntil<PrEntity>(
      async page =>
        await prRepository.findByRepositoryId(fullName, token, {
          prState: PrState.ALL,
          page,
          onPage: 100
        }),
      100,
      createdAfter
    );
    const stepsCount = getStepsCount(timelineFrom, timelineTo, step);
    if (stepsCount === 0) throw new InvalidTimelineParametersException('timelineFrom');

    const records = getTimeLineHistory(prs, step, timelineTo, stepsCount);
    return prTimelineModelFactory(records, query, prs.length);
  }
}

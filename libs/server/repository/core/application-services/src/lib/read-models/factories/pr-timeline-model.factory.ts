import {
  GetPrTimelineQuery,
  PrTimelineReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { TimelineRecord } from '@pimp-my-pr/server/repository/core/domain';

export const prTimelineModelFactory = (
  prRecords: TimelineRecord[],
  query: GetPrTimelineQuery,
  totalPrs: number
): PrTimelineReadModel => {
  return {
    data: prRecords,
    step: query.step,
    dateFrom: query.timelineFrom,
    dateTo: query.timelineTo,
    createdAfter: query.createdAfter,
    totalPrs
  };
};

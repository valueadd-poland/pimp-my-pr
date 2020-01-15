import { IQuery } from '@nestjs/cqrs';
import { ListReviewerStatisticsParams } from '@pimp-my-pr/shared/domain';

export class ListReviewerStatisticsQuery implements IQuery {
  constructor(public payload: ListReviewerStatisticsParams) {}
}

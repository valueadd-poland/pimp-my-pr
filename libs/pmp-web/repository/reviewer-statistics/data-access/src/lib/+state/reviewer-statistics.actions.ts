import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { GetReviewerStatisticsPayload } from '../resources/payloads/get-reviewer-statistics.payload';

export namespace fromReviewerStatisticsActions {
  export enum Types {
    GetReviewerStatisticsResponse = '[ReviewerStatistics] Get Single User Statistics Response',
    GetReviewerStatisticsResponseFail = '[ReviewerStatistics] Get Single User Statistics Response Fail',
    GetReviewerStatisticsResponseSuccess = '[ReviewerStatistics] Get Single User Statistics Response Success'
  }

  export class GetReviewerStatisticsResponse implements Action {
    readonly type = Types.GetReviewerStatisticsResponse;

    constructor(public payload: GetReviewerStatisticsPayload) {}
  }

  export class GetReviewerStatisticsResponseFail implements Action {
    readonly type = Types.GetReviewerStatisticsResponseFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetReviewerStatisticsResponseSuccess implements Action {
    readonly type = Types.GetReviewerStatisticsResponseSuccess;

    constructor(public payload: ReviewerStatisticsResponse) {}
  }

  export type CollectiveType =
    | GetReviewerStatisticsResponse
    | GetReviewerStatisticsResponseFail
    | GetReviewerStatisticsResponseSuccess;
}

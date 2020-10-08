import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { RepositoryModel, ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { GetReviewerStatisticsPayload } from '../resources/payloads/get-reviewer-statistics.payload';
import { ToggleSelectedRepository } from '../resources/payloads/toggle-selected-repository.interface';

export namespace fromReviewerStatisticsActions {
  export enum Types {
    GetReviewerStatisticsResponse = '[ReviewerStatistics] Get Single User Statistics Response',
    GetReviewerStatisticsResponseFail = '[ReviewerStatistics] Get Single User Statistics Response Fail',
    GetReviewerStatisticsResponseSuccess = '[ReviewerStatistics] Get Single User Statistics Response Success',
    ReviewerStatisticsAddSelectedRepository = '[ReviewerStatistics] Add Selected Repository',
    ReviewerStatisticsRemoveSelectedRepository = '[ReviewerStatistics] Remove Selected Repository'
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

  export class ReviewerStatisticsAddSelectedRepository implements Action {
    readonly type = Types.ReviewerStatisticsAddSelectedRepository;

    constructor(public payload: RepositoryModel) {}
  }

  export class ReviewerStatisticsRemoveSelectedRepository implements Action {
    readonly type = Types.ReviewerStatisticsRemoveSelectedRepository;

    constructor(public payload: RepositoryModel) {}
  }

  export type CollectiveType =
    | GetReviewerStatisticsResponse
    | GetReviewerStatisticsResponseFail
    | GetReviewerStatisticsResponseSuccess
    | ReviewerStatisticsAddSelectedRepository
    | ReviewerStatisticsRemoveSelectedRepository;
}

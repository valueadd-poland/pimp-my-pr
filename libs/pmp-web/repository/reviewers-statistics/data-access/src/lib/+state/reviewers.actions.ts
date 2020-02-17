import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { GetReviewersStatisticsCollectionPayload } from '@pimp-my-pr/pmp-web/repository/domain';

export namespace fromUserActions {
  export enum Types {
    GetReviewersStatisticsCollection = '[ReviewersStatistics] Get Reviewers Statistics Collection',
    GetReviewersStatisticsCollectionFail = '[ReviewersStatistics] Get Reviewers Statistics Collection Fail',
    GetReviewersStatisticsCollectionSuccess = '[ReviewersStatistics] Get Reviewers Statistics Collection Success'
  }

  export class GetReviewersStatisticsCollection implements Action {
    readonly type = Types.GetReviewersStatisticsCollection;

    constructor(public payload: GetReviewersStatisticsCollectionPayload) {}
  }

  export class GetReviewersStatisticsCollectionFail implements Action {
    readonly type = Types.GetReviewersStatisticsCollectionFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetReviewersStatisticsCollectionSuccess implements Action {
    readonly type = Types.GetReviewersStatisticsCollectionSuccess;

    constructor(public payload: UserStatistics[]) {}
  }

  export type CollectiveType =
    | GetReviewersStatisticsCollection
    | GetReviewersStatisticsCollectionFail
    | GetReviewersStatisticsCollectionSuccess;
}

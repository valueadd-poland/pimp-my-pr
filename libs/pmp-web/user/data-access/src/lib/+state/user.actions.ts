import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { GetUserStatisticsCollectionPayload } from '../resources/request-payloads/get-user-statistics-collection.payload';
import { UserStatistics } from '@pimp-my-pr/shared/domain';

export namespace fromUserActions {
  export enum Types {
    GetUserStatisticsCollection = '[User] Get User Statistics Collection',
    GetUserStatisticsCollectionFail = '[User] Get User Statistics Collection Fail',
    GetUserStatisticsCollectionSuccess = '[User] Get User Statistics Collection Success'
  }

  export class GetUserStatisticsCollection implements Action {
    readonly type = Types.GetUserStatisticsCollection;

    constructor(public payload: GetUserStatisticsCollectionPayload) {}
  }

  export class GetUserStatisticsCollectionFail implements Action {
    readonly type = Types.GetUserStatisticsCollectionFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetUserStatisticsCollectionSuccess implements Action {
    readonly type = Types.GetUserStatisticsCollectionSuccess;

    constructor(public payload: UserStatistics[]) {}
  }

  export type CollectiveType =
    | GetUserStatisticsCollection
    | GetUserStatisticsCollectionFail
    | GetUserStatisticsCollectionSuccess;
}

import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { GetSingleUserStatisticsResponseRequestPayload } from '../resources/request-payloads/get-single-user-statistics-response.request-payload';
import { SingleUserStatisticsResponse } from '@pimp-my-pr/shared/domain';

export namespace fromSingleUserStatisticsActions {
  export enum Types {
    GetSingleUserStatisticsResponse = '[SingleUserStatistics] Get Single User Statistics Response',
    GetSingleUserStatisticsResponseFail = '[SingleUserStatistics] Get Single User Statistics Response Fail',
    GetSingleUserStatisticsResponseSuccess = '[SingleUserStatistics] Get Single User Statistics Response Success'
  }

  export class GetSingleUserStatisticsResponse implements Action {
    readonly type = Types.GetSingleUserStatisticsResponse;

    constructor(public payload: GetSingleUserStatisticsResponseRequestPayload) {}
  }

  export class GetSingleUserStatisticsResponseFail implements Action {
    readonly type = Types.GetSingleUserStatisticsResponseFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetSingleUserStatisticsResponseSuccess implements Action {
    readonly type = Types.GetSingleUserStatisticsResponseSuccess;

    constructor(public payload: SingleUserStatisticsResponse) {}
  }

  export type CollectiveType =
    | GetSingleUserStatisticsResponse
    | GetSingleUserStatisticsResponseFail
    | GetSingleUserStatisticsResponseSuccess;
}

import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { GetRepositoryStatisticsRequestPayload } from '../resources/request-payloads/get-repository-statistics.request-payload';
import { RepositoryModel } from '@pimp-my-pr/shared/domain';

export namespace fromSingleRepositoryStatisticsActions {
  export enum Types {
    GetRepositoryStatistics = '[SingleRepositoryStatistics] Get Repository Statistics',
    GetRepositoryStatisticsFail = '[SingleRepositoryStatistics] Get Repository Statistics Fail',
    GetRepositoryStatisticsSuccess = '[SingleRepositoryStatistics] Get Repository Statistics Success'
  }

  export class GetRepositoryStatistics implements Action {
    readonly type = Types.GetRepositoryStatistics;

    constructor(public payload: GetRepositoryStatisticsRequestPayload) {}
  }

  export class GetRepositoryStatisticsFail implements Action {
    readonly type = Types.GetRepositoryStatisticsFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetRepositoryStatisticsSuccess implements Action {
    readonly type = Types.GetRepositoryStatisticsSuccess;

    constructor(public payload: RepositoryModel) {}
  }

  export type CollectiveType =
    | GetRepositoryStatistics
    | GetRepositoryStatisticsFail
    | GetRepositoryStatisticsSuccess;
}

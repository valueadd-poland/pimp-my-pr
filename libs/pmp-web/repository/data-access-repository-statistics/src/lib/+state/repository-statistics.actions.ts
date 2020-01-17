import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';

export namespace fromRepositoryStatisticsActions {
  export enum Types {
    GetRepositoryStatisticsCollection = '[RepositoryStatistics] Get Repository Statistics Collection',
    GetRepositoryStatisticsCollectionFail = '[RepositoryStatistics] Get Repository Statistics Collection Fail',
    GetRepositoryStatisticsCollectionSuccess = '[RepositoryStatistics] Get Repository Statistics Collection Success'
  }

  export class GetRepositoryStatisticsCollection implements Action {
    readonly type = Types.GetRepositoryStatisticsCollection;
  }

  export class GetRepositoryStatisticsCollectionFail implements Action {
    readonly type = Types.GetRepositoryStatisticsCollectionFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetRepositoryStatisticsCollectionSuccess implements Action {
    readonly type = Types.GetRepositoryStatisticsCollectionSuccess;

    constructor(public payload: RepositoryStatistics[]) {}
  }

  export type CollectiveType =
    | GetRepositoryStatisticsCollection
    | GetRepositoryStatisticsCollectionFail
    | GetRepositoryStatisticsCollectionSuccess;
}

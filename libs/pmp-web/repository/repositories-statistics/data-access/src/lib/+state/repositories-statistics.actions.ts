import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';

export namespace fromRepositoriesStatisticsActions {
  export enum Types {
    GetRepositoriesStatisticsCollection = '[RepositoryStatistics] Get Repositories Statistics Collection',
    GetRepositoriesStatisticsCollectionFail = '[RepositoryStatistics] Get Repositories Statistics Collection Fail',
    GetRepositoriesStatisticsCollectionSuccess = '[RepositoryStatistics] Get Repositories Statistics Collection Success'
  }

  export class GetRepositoriesStatisticsCollection implements Action {
    readonly type = Types.GetRepositoriesStatisticsCollection;
  }

  export class GetRepositoriesStatisticsCollectionFail implements Action {
    readonly type = Types.GetRepositoriesStatisticsCollectionFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetRepositoriesStatisticsCollectionSuccess implements Action {
    readonly type = Types.GetRepositoriesStatisticsCollectionSuccess;

    constructor(public payload: RepositoryStatistics[]) {}
  }

  export type CollectiveType =
    | GetRepositoriesStatisticsCollection
    | GetRepositoriesStatisticsCollectionFail
    | GetRepositoriesStatisticsCollectionSuccess;
}

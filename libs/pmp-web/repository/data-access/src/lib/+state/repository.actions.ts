import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';
import { AddRepositoryPayload } from '@pimp-my-pr/pmp-web/repository/domain';

export namespace fromRepositoryActions {
  export enum Types {
    GetRepositoryCollection = '[Repository] Get Repository Collection',
    GetRepositoryCollectionFail = '[Repository] Get Repository Collection Fail',
    GetRepositoryCollectionSuccess = '[Repository] Get Repository Collection Success',
    AddRepository = '[Repository] Add Repository',
    AddRepositoryFail = '[Repository] Add Repository Fail',
    AddRepositorySuccess = '[Repository] Add Repository Success'
  }

  export class GetRepositoryCollection implements Action {
    readonly type = Types.GetRepositoryCollection;
  }

  export class GetRepositoryCollectionFail implements Action {
    readonly type = Types.GetRepositoryCollectionFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetRepositoryCollectionSuccess implements Action {
    readonly type = Types.GetRepositoryCollectionSuccess;

    constructor(public payload: Repository[]) {}
  }

  export class AddRepository implements Action {
    readonly type = Types.AddRepository;

    constructor(public payload: AddRepositoryPayload) {}
  }

  export class AddRepositoryFail implements Action {
    readonly type = Types.AddRepositoryFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class AddRepositorySuccess implements Action {
    readonly type = Types.AddRepositorySuccess;
  }

  export type CollectiveType =
    | GetRepositoryCollection
    | GetRepositoryCollectionFail
    | GetRepositoryCollectionSuccess
    | AddRepository
    | AddRepositoryFail
    | AddRepositorySuccess;
}

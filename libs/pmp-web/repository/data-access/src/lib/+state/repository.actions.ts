import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import {
  AddRepositoryPayload,
  DeleteRepositoryPayload,
  EditRepositoryPayload,
  Repository
} from '@pimp-my-pr/pmp-web/repository/domain';

export namespace fromRepositoryActions {
  export enum Types {
    GetRepositoryCollection = '[Repository] Get Repository Collection',
    GetRepositoryCollectionFail = '[Repository] Get Repository Collection Fail',
    GetRepositoryCollectionSuccess = '[Repository] Get Repository Collection Success',
    AddRepository = '[Repository] Add Repository',
    AddRepositoryFail = '[Repository] Add Repository Fail',
    AddRepositorySuccess = '[Repository] Add Repository Success',
    DeleteRepository = '[Repository] Delete Repository',
    DeleteRepositoryFail = '[Repository] Delete Repository Fail',
    DeleteRepositorySuccess = '[Repository] Delete Repository Success',
    EditRepository = '[Repository] Edit Repository',
    EditRepositoryFail = '[Repository] Edit Repository Fail',
    EditRepositorySuccess = '[Repository] Edit Repository Success'
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

  export class DeleteRepository implements Action {
    readonly type = Types.DeleteRepository;

    constructor(public payload: DeleteRepositoryPayload) {}
  }

  export class DeleteRepositoryFail implements Action {
    readonly type = Types.DeleteRepositoryFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class DeleteRepositorySuccess implements Action {
    readonly type = Types.DeleteRepositorySuccess;
  }

  export class EditRepository implements Action {
    readonly type = Types.EditRepository;

    constructor(public payload: EditRepositoryPayload) {}
  }

  export class EditRepositoryFail implements Action {
    readonly type = Types.EditRepositoryFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class EditRepositorySuccess implements Action {
    readonly type = Types.EditRepositorySuccess;
  }

  export type CollectiveType =
    | GetRepositoryCollection
    | GetRepositoryCollectionFail
    | GetRepositoryCollectionSuccess
    | AddRepository
    | AddRepositoryFail
    | AddRepositorySuccess
    | DeleteRepository
    | DeleteRepositoryFail
    | DeleteRepositorySuccess
    | EditRepository
    | EditRepositoryFail
    | EditRepositorySuccess;
}

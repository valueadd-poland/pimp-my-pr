import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { SettingModel, UpdateSettingModelPayload } from '@pimp-my-pr/pmp-web/repository/domain';

export namespace fromSettingsActions {
  export enum Types {
    GetSettingModelCollection = '[Repository settings] Get Setting Model Collection',
    GetSettingModelCollectionFail = '[Repository settings] Get Setting Model Collection Fail',
    GetSettingModelCollectionSuccess = '[Repository settings] Get Setting Model Collection Success',
    UpdateSettingModel = '[Repository settings] Update Setting Model',
    UpdateSettingModelFail = '[Repository settings] Update Setting Model Fail',
    UpdateSettingModelSuccess = '[Repository settings] Update Setting Model Success'
  }

  export class GetSettingModelCollection implements Action {
    readonly type = Types.GetSettingModelCollection;
  }

  export class GetSettingModelCollectionFail implements Action {
    readonly type = Types.GetSettingModelCollectionFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetSettingModelCollectionSuccess implements Action {
    readonly type = Types.GetSettingModelCollectionSuccess;

    constructor(public payload: SettingModel[]) {}
  }

  export class UpdateSettingModel implements Action {
    readonly type = Types.UpdateSettingModel;

    constructor(public payload: UpdateSettingModelPayload) {}
  }

  export class UpdateSettingModelFail implements Action {
    readonly type = Types.UpdateSettingModelFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class UpdateSettingModelSuccess implements Action {
    readonly type = Types.UpdateSettingModelSuccess;

    constructor(public payload: UpdateSettingModelPayload) {}
  }

  export type CollectiveType =
    | GetSettingModelCollection
    | GetSettingModelCollectionFail
    | GetSettingModelCollectionSuccess
    | UpdateSettingModel
    | UpdateSettingModelFail
    | UpdateSettingModelSuccess;
}

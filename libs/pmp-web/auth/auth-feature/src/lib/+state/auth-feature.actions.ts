import { Action } from '@ngrx/store';

export namespace fromAuthFeatureActions {
  export enum Types {
    RedirectAfterLogin = '[Auth Feature] Redirect After Login'
  }

  export class RedirectAfterLogin implements Action {
    readonly type = Types.RedirectAfterLogin;
  }

  export type CollectiveType = RedirectAfterLogin;
}

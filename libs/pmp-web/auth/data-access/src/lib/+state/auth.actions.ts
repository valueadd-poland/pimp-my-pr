import { Action } from '@ngrx/store';
import { LoginPayload } from '@pimp-my-pr/pmp-web/auth/domain';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSuccessPayload } from '@pimp-my-pr/shared/domain';

export namespace fromAuthActions {
  export enum Types {
    Login = '[Auth] Login',
    LoginFail = '[Auth] Login Fail',
    LoginSuccess = '[Auth] Login Success',
    SetTokenFromStorage = '[Auth] Set Token From Storage'
  }

  export class Login implements Action {
    readonly type = Types.Login;

    constructor(public payload: LoginPayload) {}
  }

  export class LoginFail implements Action {
    readonly type = Types.LoginFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class LoginSuccess implements Action {
    readonly type = Types.LoginSuccess;

    constructor(public payload: LoginSuccessPayload) {}
  }

  export class SetTokenFromStorage implements Action {
    readonly type = Types.SetTokenFromStorage;

    constructor(public payload: string) {}
  }

  export type CollectiveType = Login | LoginFail | LoginSuccess | SetTokenFromStorage;
}

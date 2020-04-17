import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { LoginPayload } from '@pimp-my-pr/pmp-web/auth/domain';
import { LoginSuccessPayload } from '@pimp-my-pr/shared/domain';

export namespace fromAuthActions {
  export enum Types {
    Login = '[Auth] Login',
    LoginFail = '[Auth] Login Fail',
    LoginSuccess = '[Auth] Login Success',
    Logout = '[Auth] Logout'
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

  export class Logout implements Action {
    readonly type = Types.Logout;
  }

  export type CollectiveType = Login | LoginFail | LoginSuccess | Logout;
}

import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { LoginPayload, GetUserSuccessPayload } from '@pimp-my-pr/pmp-web/auth/domain';
import { LoginSuccessPayload } from '@pimp-my-pr/shared/domain';

export namespace fromAuthActions {
  export enum Types {
    ApplyToken = '[Auth] Apply Token',
    Login = '[Auth] Login',
    LoginFail = '[Auth] Login Fail',
    LoginSuccess = '[Auth] Login Success',
    GetUser = '[Auth] GetUser',
    GetUserFail = '[Auth] GetUser Fail',
    GetUserSuccess = '[Auth] GetUser Success',
    Logout = '[Auth] Logout'
  }

  export class ApplyToken implements Action {
    readonly type = Types.ApplyToken;

    constructor(public payload: LoginSuccessPayload) {}
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

  export class GetUser implements Action {
    readonly type = Types.GetUser;

    constructor() {}
  }

  export class GetUserFail implements Action {
    readonly type = Types.GetUserFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetUserSuccess implements Action {
    readonly type = Types.GetUserSuccess;

    constructor(public payload: GetUserSuccessPayload) {}
  }

  export class Logout implements Action {
    readonly type = Types.Logout;
  }

  export type CollectiveType =
    | ApplyToken
    | Login
    | LoginFail
    | LoginSuccess
    | GetUser
    | GetUserFail
    | GetUserSuccess
    | Logout;
}

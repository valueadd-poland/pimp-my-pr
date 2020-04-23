import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload } from '@pimp-my-pr/pmp-web/auth/domain';
import {
  LoginSuccessPayload,
  LoginSuccessResponse,
  GetUserSuccessPayload,
  GetUserResponse
} from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthDataService {
  readonly endpoints = {
    getAccessToken: urlFactory('/api/auth/access-token'),
    getUser: urlFactory('/api/user-info')
  };

  readonly TOKEN_KEY = 'TOKEN';

  constructor(private http: HttpClient) {}

  clearSavedToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  login(payload: LoginPayload): Observable<LoginSuccessPayload> {
    return this.http
      .post<LoginSuccessResponse>(this.endpoints.getAccessToken.url(), {
        code: payload.code,
        platform: payload.platform
      })
      .pipe(map((res: LoginSuccessResponse) => res.data));
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }

  saveToken(authToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(authToken));
  }

  getUser(): Observable<GetUserSuccessPayload> {
    return this.http
      .get<GetUserResponse>(this.endpoints.getUser.url())
      .pipe(map((res: GetUserResponse) => res.data));
  }
}

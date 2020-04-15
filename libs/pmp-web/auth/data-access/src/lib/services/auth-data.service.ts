import { Injectable } from '@angular/core';
import { LoginPayload } from '@pimp-my-pr/pmp-web/auth/domain';
import { Observable } from 'rxjs';
import { urlFactory } from '@valueadd/typed-urls';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginSuccessPayload, LoginSuccessResponse } from '@pimp-my-pr/shared/domain';

@Injectable()
export class AuthDataService {
  readonly endpoints = {
    getAccessToken: urlFactory('/api/auth/access-token')
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
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken: string;

  constructor(private authFacade: AuthFacade) {
    this.initAuthToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      !!this.authToken
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.authToken}`
            }
          })
        : req.clone()
    );
  }

  private initAuthToken(): void {
    this.authFacade.authToken$.pipe(filter(token => !!token)).subscribe((token: string) => {
      this.authToken = token;
    });
  }
}

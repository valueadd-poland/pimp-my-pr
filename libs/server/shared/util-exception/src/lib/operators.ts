import {
  CoreNotFoundException,
  CoreUnprocessableEntityException,
  CoreUnauthorizedFoundException
} from '@pimp-my-pr/server/shared/domain';
import { AxiosError } from 'axios';
import { OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function catchRequestExceptions(): OperatorFunction<any, any> {
  return source$ =>
    source$.pipe(
      catchError((err: AxiosError) => {
        if (err.response && err.response.status) {
          switch (err.response.status) {
            case 401:
              return throwError(new CoreUnauthorizedFoundException());
            case 404:
              return throwError(new CoreNotFoundException());
            case 422:
              return throwError(new CoreUnprocessableEntityException());
            default:
              return throwError(err);
          }
        }
        return throwError(err);
      })
    );
}

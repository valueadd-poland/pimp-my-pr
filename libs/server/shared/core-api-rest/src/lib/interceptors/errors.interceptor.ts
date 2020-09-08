import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  UnprocessableEntityException
} from '@nestjs/common';
import {
  CoreNotFoundException,
  CoreUnauthorizedFoundException,
  CoreUnprocessableEntityException
} from '@pimp-my-pr/server/shared/domain';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CoreResourceAlreadyExistsException } from '@pimp-my-pr/server/shared/domain';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof CoreNotFoundException || err instanceof EntityNotFoundError) {
          return throwError(new NotFoundException(err.message));
        }
        if (err instanceof CoreUnauthorizedFoundException) {
          return throwError(new UnauthorizedException(err.message));
        }
        if (err instanceof CoreUnprocessableEntityException) {
          return throwError(new UnprocessableEntityException(err.message));
        }
        if (err instanceof CoreResourceAlreadyExistsException) {
          return throwError(new ConflictException(err.message));
        }
        if (err) return throwError(err);
      })
    );
  }
}

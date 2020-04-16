import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response as VAResponse } from '@pimp-my-pr/server/shared/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<VAResponse<any, null>> {
    return next.handle().pipe(map(data => VAResponse.createSuccessFullResponse(data)));
  }
}

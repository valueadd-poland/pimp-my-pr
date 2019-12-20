import { IResponse } from '@pimp-my-pr/shared/domain';
import { HttpException } from '@nestjs/common';

export class Response<T, E> implements IResponse<T, E> {
  data: T;
  error: any;

  public static createSuccessFullResponse<T>(data: T): Response<T, null> {
    const res = new Response<T, null>();
    res.data = data;
    res.error = null;
    return res;
  }

  public static createErrorResponse<E>(
    error: HttpException
  ): Response<null, E> {
    const res = new Response<null, E>();
    res.data = null;
    res.error = error.message.message || error.message.error || null;
    return res;
  }
}

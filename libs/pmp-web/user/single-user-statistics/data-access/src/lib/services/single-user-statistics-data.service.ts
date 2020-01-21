import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetSingleUserStatisticsResponseRequestPayload } from '../resources/request-payloads/get-single-user-statistics-response.request-payload';
import { IResponse, SingleUserStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';

@Injectable()
export class SingleUserStatisticsDataService {
  readonly endpoints = {
    getSingleUserStatisticsResponse: urlFactory<'username'>(
      '//localhost:3333/api/repository/reviewers/:username',
      true
    )
  };

  constructor(private http: HttpClient) {}

  getSingleUserStatisticsResponse(
    payload: GetSingleUserStatisticsResponseRequestPayload
  ): Observable<SingleUserStatisticsResponse> {
    return this.http
      .get<IResponse<SingleUserStatisticsResponse, null>>(
        this.endpoints.getSingleUserStatisticsResponse.url({ username: payload.username })
      )
      .pipe(map((res: IResponse<SingleUserStatisticsResponse, null>) => res.data));
  }
}

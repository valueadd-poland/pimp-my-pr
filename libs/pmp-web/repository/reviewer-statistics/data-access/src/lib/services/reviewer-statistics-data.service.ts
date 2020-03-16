import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetReviewerStatisticsResponseRequestPayload } from '../resources/request-payloads/get-reviewer-statistics-response.request-payload';

@Injectable()
export class ReviewerStatisticsDataService {
  readonly endpoints = {
    getReviewerStatisticsResponse: urlFactory<'username'>(
      '/api/statistics/reviewers/:username',
      true
    )
  };

  constructor(private http: HttpClient) {}

  getReviewerStatisticsResponse(
    payload: GetReviewerStatisticsResponseRequestPayload
  ): Observable<ReviewerStatisticsResponse> {
    return this.http
      .get<IResponse<ReviewerStatisticsResponse, null>>(
        this.endpoints.getReviewerStatisticsResponse.url({ username: payload.username })
      )
      .pipe(map((res: IResponse<ReviewerStatisticsResponse, null>) => res.data));
  }
}

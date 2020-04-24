import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetReviewerStatisticsPayload } from '../resources/payloads/get-reviewer-statistics.payload';

@Injectable()
export class ReviewerStatisticsDataService {
  readonly endpoints = {
    getReviewerStatisticsResponse: urlFactory<'id'>('/api/statistics/reviewers/:id', true)
  };

  constructor(private http: HttpClient) {}

  getReviewerStatisticsResponse(
    payload: GetReviewerStatisticsPayload
  ): Observable<ReviewerStatisticsResponse> {
    return this.http
      .get<IResponse<ReviewerStatisticsResponse, null>>(
        this.endpoints.getReviewerStatisticsResponse.url({ id: payload.id })
      )
      .pipe(map((res: IResponse<ReviewerStatisticsResponse, null>) => res.data));
  }
}

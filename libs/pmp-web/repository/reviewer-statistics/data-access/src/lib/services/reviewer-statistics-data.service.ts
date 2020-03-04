import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetReviewerStatisticsResponseRequestPayload } from '../resources/request-payloads/get-reviewer-statistics-response.request-payload';
import { IResponse, ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';

@Injectable()
export class ReviewerStatisticsDataService {
  readonly endpoints = {
    getReviewerStatisticsResponse: urlFactory<'username'>('/api/reviewers/:username', true)
  };

  constructor(private http: HttpClient) {}

  getReviewerStatisticsResponse(
    payload: GetReviewerStatisticsResponseRequestPayload
  ): Observable<ReviewerStatisticsResponse> {
    return this.http
      .get<IResponse<ReviewerStatisticsResponse, null>>(
        this.endpoints.getReviewerStatisticsResponse.url({ username: payload.reviewer })
      )
      .pipe(map((res: IResponse<ReviewerStatisticsResponse, null>) => res.data));
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ListUsersResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { GetReviewersStatisticsCollectionPayload } from '@pimp-my-pr/pmp-web/repository/domain';

@Injectable()
export class ReviewersDataService {
  readonly endpoints = {
    getReviewersStatisticsCollection: urlFactory('/api/statistics/reviewers')
  };

  constructor(private http: HttpClient) {}

  getReviewersStatisticsCollection(
    payload: GetReviewersStatisticsCollectionPayload
  ): Observable<UserStatistics[]> {
    return this.http
      .get<ListUsersResponse>(this.endpoints.getReviewersStatisticsCollection.url())
      .pipe(map((res: ListUsersResponse) => res.data));
  }
}

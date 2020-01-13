import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GetUserStatisticsCollectionPayload } from '@pimp-my-pr/pmp-web/user/domain';
import { ListUsersResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';

@Injectable()
export class UserDataService {
  readonly endpoints = {
    getUserStatisticsCollection: urlFactory('//localhost:3333/api/repository/reviewers')
  };

  constructor(private http: HttpClient) {}

  getUserStatisticsCollection(
    payload: GetUserStatisticsCollectionPayload
  ): Observable<UserStatistics[]> {
    return this.http
      .get<ListUsersResponse>(this.endpoints.getUserStatisticsCollection.url())
      .pipe(map((res: ListUsersResponse) => res.data));
  }
}

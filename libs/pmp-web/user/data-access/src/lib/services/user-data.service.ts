import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GetUserStatisticsCollectionPayload } from '../resources/payloads/get-user-statistics-collection.payload';
import { ListUsersResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  readonly endpoints = {
    getUserStatisticsCollection: urlFactory('//localhost:3333/api/repository/users')
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

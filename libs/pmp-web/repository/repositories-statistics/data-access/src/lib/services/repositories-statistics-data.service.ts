import { Injectable } from '@angular/core';
import { urlFactory } from '@valueadd/typed-urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRepositoryStatisticsResponse, RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoriesStatisticsDataService {
  readonly endpoints = {
    getRepositoryStatisticsCollection: urlFactory('/api/statistics/repository')
  };

  constructor(private http: HttpClient) {}

  getRepositoryStatisticsCollection(): Observable<RepositoryStatistics[]> {
    return this.http
      .get<ApiRepositoryStatisticsResponse>(this.endpoints.getRepositoryStatisticsCollection.url())
      .pipe(map((res: ApiRepositoryStatisticsResponse) => res.data));
  }
}

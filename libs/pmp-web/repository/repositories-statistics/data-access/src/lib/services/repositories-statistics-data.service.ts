import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRepositoryStatisticsResponse, RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { Observable } from 'rxjs';
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

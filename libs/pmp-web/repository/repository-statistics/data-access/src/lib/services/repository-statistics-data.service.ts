import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetRepositoryStatisticsPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { IResponse, RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoryStatisticsDataService {
  readonly endpoints = {
    getRepositoryStatistics: urlFactory<'repositoryId'>(
      '/api/statistics/repository/:repositoryId',
      true
    )
  };

  constructor(private http: HttpClient) {}

  getRepositoryStatistics(
    payload: GetRepositoryStatisticsPayload
  ): Observable<RepositoryStatistics> {
    return this.http
      .get<IResponse<RepositoryStatistics, null>>(
        this.endpoints.getRepositoryStatistics.url({ repositoryId: payload.id })
      )
      .pipe(map((res: IResponse<RepositoryStatistics, null>) => res.data));
  }
}

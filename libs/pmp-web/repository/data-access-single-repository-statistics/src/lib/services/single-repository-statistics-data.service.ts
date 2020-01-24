import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetRepositoryStatisticsRequestPayload } from '../resources/request-payloads/get-repository-statistics.request-payload';
import { RepositoryModel } from '@pimp-my-pr/shared/domain';

@Injectable()
export class SingleRepositoryStatisticsDataService {
  readonly endpoints = {
    // TODO missing API url to get details about repository
    getRepositoryStatistics: ''
  };
  constructor(private http: HttpClient) {}

  getRepositoryStatistics(
    payload: GetRepositoryStatisticsRequestPayload
  ): Observable<RepositoryModel> {
    return this.http.get<any>(this.endpoints.getRepositoryStatistics);
  }
}

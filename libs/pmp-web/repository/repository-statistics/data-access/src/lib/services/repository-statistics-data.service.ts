import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetRepositoryStatisticsPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { RepositoryModel } from '@pimp-my-pr/shared/domain';

const mockedData: RepositoryModel = {
  // TODO mocked data for repository
  owner: 'valueadd',
  fullName: 'pimp-my-pr',
  name: 'pmp',
  pictureUrl: 'https://picsum.photos/id/1025/200/300',
  prsStatistics: [
    {
      author: {
        name: 'MockUser',
        avatarUrl: 'https://picsum.photos/id/237/200/300',
        id: 1231
      },
      commentsCount: 123,
      createdAt: '12/12/12',
      linesOfCodeToCheck: 3245,
      reviewCommentsCount: 234,
      id: 2345,
      timeWaiting: '124',
      title: '12414',
      url: 'https://picsum.photos/id/1050/200/300'
    }
  ]
};

@Injectable()
export class RepositoryStatisticsDataService {
  readonly endpoints = {
    // TODO missing API url to get details about repository
    getRepositoryStatistics: ''
  };
  constructor(private http: HttpClient) {}

  getRepositoryStatistics(payload: GetRepositoryStatisticsPayload): Observable<RepositoryModel> {
    return of(mockedData);
  }
}

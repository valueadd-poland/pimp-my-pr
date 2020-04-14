import { Injectable } from '@angular/core';
import { urlFactory } from '@valueadd/typed-urls';
import { HttpClient } from '@angular/common/http';
import { AddRepositoryPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { Observable } from 'rxjs';
import { IResponse } from '@pimp-my-pr/shared/domain';
import { map } from 'rxjs/operators';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';

export class RepositoryDataService {
  readonly endpoints = {
    getRepositoryCollection: urlFactory('/api/repository'),
    addRepository: urlFactory('/api/repository')
  };

  constructor(private http: HttpClient) {}

  getRepositoryCollection(): Observable<Repository[]> {
    return this.http
      .get<IResponse<Repository[]>>(this.endpoints.getRepositoryCollection.url())
      .pipe(map(res => res.data));
  }

  addRepository(data: AddRepositoryPayload): Observable<void> {
    return this.http.post<void>(this.endpoints.addRepository.url(), data);
  }
}

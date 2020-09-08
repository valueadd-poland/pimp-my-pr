import { HttpClient } from '@angular/common/http';
import {
  AddRepositoryPayload,
  DeleteRepositoryPayload,
  EditRepositoryPayload,
  Repository
} from '@pimp-my-pr/pmp-web/repository/domain';
import { IResponse } from '@pimp-my-pr/shared/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RepositoryDataService {
  readonly endpoints = {
    getRepositoryCollection: urlFactory('/api/repository'),
    addRepository: urlFactory('/api/repository'),
    deleteRepository: urlFactory<'id'>('/api/repository/:id', true),
    editRepository: urlFactory<'id'>('/api/repository/:id', true)
  };

  constructor(private http: HttpClient) {}

  getRepositoryCollection(): Observable<Repository[]> {
    return this.http
      .get<IResponse<Repository[]>>(this.endpoints.getRepositoryCollection.url())
      .pipe(map(res => res.data));
  }

  addRepository(data: AddRepositoryPayload): Observable<Repository> {
    return this.http
      .post<IResponse<Repository>>(this.endpoints.addRepository.url(), data)
      .pipe(map(resp => resp.data));
  }

  deleteRepository(data: DeleteRepositoryPayload): Observable<void> {
    return this.http.delete<void>(this.endpoints.deleteRepository.url({ id: data.repositoryId }));
  }

  editRepository(data: EditRepositoryPayload): Observable<void> {
    return this.http.put<void>(this.endpoints.editRepository.url({ id: data.repositoryId }), {
      maxLines: data.maxLines,
      maxWaitingTime: data.maxWaitingTime
    });
  }
}

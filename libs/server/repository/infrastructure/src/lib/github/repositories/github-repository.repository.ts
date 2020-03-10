import { HttpService, Injectable } from '@nestjs/common';
import {
  RepositoryEntity,
  RepositoryNotFoundException
} from '@pimp-my-pr/server/repository/core/domain';
import { githubConfig } from '@pimp-my-pr/server/shared/core';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { mapGithubRepository } from '../mappers/map-github-repository';
import { RemoteRepositoryRepository } from '../../repositories/remote-repository.repository';

@Injectable()
export class GithubRepositoryRepository extends RemoteRepositoryRepository {
  endpoints = {
    getRepository: urlFactory<'fullName'>(githubConfig.apiUrl + '/repos/:fullName', true),
    getSingleRepository: urlFactory<'id'>(githubConfig.apiUrl + '/repositories/:id', true),
    getRepositoryContributors: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title/contributors',
      true
    )
  };

  constructor(private httpService: HttpService) {
    super();
  }

  getSingleRepositoryByName(fullName: string): Promise<RepositoryEntity> {
    return this.httpService
      .get<GithubRepositoryEntity>(this.endpoints.getRepository.url({ fullName }))
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(mapGithubRepository),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(fullName));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }

  getSingleRepositoryById(id: string): Promise<RepositoryEntity> {
    return this.httpService
      .get<RepositoryEntity>(this.endpoints.getSingleRepository.url({ id }))
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(mapGithubRepository),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(`${id}`));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }
}

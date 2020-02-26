import { HttpService, Injectable } from '@nestjs/common';
import {
  RepositoryEntity,
  RepositoryNotFoundException
} from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { githubConfig, PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosError, AxiosResponse } from 'axios';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { mapGithubRepository } from '../mappers/map-github-repository';

@Injectable()
export class GithubRepositoryRepository extends RepositoryRepository {
  endpoints = {
    getRepository: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title',
      true
    ),
    getSingleRepository: urlFactory<'id'>(githubConfig.apiUrl + '/repositories/:id', true),
    getRepositoryContributors: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title/contributors',
      true
    )
  };

  constructor(
    private httpService: HttpService,
    private prRepository: PrRepository,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {
    super();
  }

  findAll(): Promise<RepositoryEntity[]> {
    const owner = this.pmpApiServiceConfigService.getRepositoryOwner();
    const title = this.pmpApiServiceConfigService.getRepositoryTitle();
    return this.httpService
      .get<GithubRepositoryEntity>(
        this.endpoints.getRepository.url({
          owner,
          title
        })
      )
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(mapGithubRepository),
        map(repository => [repository]),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(`${owner}/${title}`));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }

  getSingleRepository(id: string): Promise<RepositoryEntity> {
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

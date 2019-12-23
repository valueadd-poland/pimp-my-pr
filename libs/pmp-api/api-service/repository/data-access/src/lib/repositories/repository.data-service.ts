import { HttpService, Injectable } from '@nestjs/common';
import {
  PrModel,
  RepositoryModel,
  RepositoryNotFoundException
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import {
  githubConfig,
  PmpApiServiceConfigService
} from '@pimp-my-pr/pmp-api/shared/config';
import { urlFactory } from '@valueadd/typed-urls';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { catchError, map } from 'rxjs/operators';
import { GithubRepositoryMapper } from '../mappers/github-repository.mapper';
import { AxiosError, AxiosResponse } from 'axios';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { GithubPrMapper } from '../mappers/github-pr.mapper';
import { throwError } from 'rxjs';
import { catchRequestExceptions } from '@pimp-my-pr/pmp-api/shared/util';
import {
  CoreException,
  CoreNotFoundException
} from '@pimp-my-pr/pmp-api/shared/domain';

@Injectable()
export class RepositoryDataService {
  endpoints = {
    getRepository: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title',
      true
    ),
    getRepositoryPrs: urlFactory<'fullName'>(
      githubConfig.apiUrl + '/repos/:fullName/pulls',
      true
    )
  };
  prMapper = new GithubPrMapper();
  repositoryMapper = new GithubRepositoryMapper();

  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {}

  find(): Promise<RepositoryModel[]> {
    const owner = this.pmpApiServiceConfigService.getRepositoryOwner();
    const title = this.pmpApiServiceConfigService.getRepositoryTitle();
    return this.httpService
      .get<GithubRepositoryEntity>(
        this.endpoints.getRepository.url({
          owner: owner,
          title: title
        })
      )
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(this.repositoryMapper.mapFrom),
        map(repository => [repository]),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(
              new RepositoryNotFoundException(`${owner}/${title}`)
            );
          }
          return throwError(error);
        })
      )
      .toPromise();
  }

  getRepositoryPrs(repositoryFullName: string): Promise<PrModel[]> {
    return this.httpService
      .get<GithubPrEntity>(
        this.endpoints.getRepositoryPrs.url({ fullName: repositoryFullName })
      )
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(prs => prs.map(pr => this.prMapper.mapFrom(pr))),
        catchRequestExceptions()
      )
      .toPromise();
  }
}

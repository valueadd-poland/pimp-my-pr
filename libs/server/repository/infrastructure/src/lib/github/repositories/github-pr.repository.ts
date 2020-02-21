import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { githubConfig } from '@pimp-my-pr/server/shared/core';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosResponse } from 'axios';
import { map, switchMap } from 'rxjs/operators';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { GithubPrMapper } from '../mappers/github-pr.mapper';
import { PrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { forkJoin } from 'rxjs';

@Injectable()
export class GithubPrRepository extends PrRepository {
  endpoints = {
    getPr: urlFactory<'repoFullName' | 'prId'>(
      githubConfig.apiUrl + '/repos/:repoFullName/pulls/:prId',
      true
    ),
    getRepositoryPrs: urlFactory<'fullName'>(githubConfig.apiUrl + '/repos/:fullName/pulls', true)
  };

  prMapper = new GithubPrMapper();

  constructor(private httpService: HttpService) {
    super();
  }

  get(repoFullName: string, prId: number): Promise<PrEntity> {
    return this.httpService
      .get<GithubPrDetailsEntity>(this.endpoints.getPr.url({ repoFullName, prId }))
      .pipe(
        map((res: AxiosResponse<GithubPrDetailsEntity>) => this.prMapper.mapFrom(res.data)),
        catchRequestExceptions()
      )
      .toPromise();
  }

  findByRepository(repositoryId: string): Promise<PrEntity[]> {
    return this.httpService
      .get<GithubPrEntity[]>(this.endpoints.getRepositoryPrs.url({ fullName: repositoryId }))
      .pipe(
        map(res => res.data),
        switchMap(prs => forkJoin(prs.map(pr => this.get(repositoryId, pr.number))))
      )
      .toPromise();
  }
}

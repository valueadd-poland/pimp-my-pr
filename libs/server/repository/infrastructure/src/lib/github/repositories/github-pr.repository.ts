import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { githubConfig } from '@pimp-my-pr/server/shared/core';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { mapGithubPr } from '../mappers/map-github-pr';

@Injectable()
export class GithubPrRepository extends PrRepository {
  endpoints = {
    getPr: urlFactory<'repoFullName' | 'prId'>(
      githubConfig.apiUrl + '/repos/:repoFullName/pulls/:prId',
      true
    ),
    getRepositoryPrs: urlFactory<'fullName'>(githubConfig.apiUrl + '/repos/:fullName/pulls', true)
  };

  constructor(private httpService: HttpService) {
    super();
  }

  get(repoFullName: string, prId: number, token: string): Promise<PrEntity> {
    return this.httpService
      .get<GithubPrDetailsEntity>(this.endpoints.getPr.url({ repoFullName, prId }), {
        headers: { Authorization: `token ${token}` }
      })
      .pipe(
        map(res => res.data),
        map(mapGithubPr),
        catchRequestExceptions()
      )
      .toPromise();
  }

  findByRepository(repositoryId: string, token: string): Promise<PrEntity[]> {
    return this.httpService
      .get<GithubPrEntity[]>(this.endpoints.getRepositoryPrs.url({ fullName: repositoryId }), {
        headers: { Authorization: `token ${token}` }
      })
      .pipe(
        map(res => res.data),

        switchMap(prs =>
          prs.length ? forkJoin(prs.map(pr => this.get(repositoryId, pr.number, token))) : of([])
        )
      )
      .toPromise();
  }
}

import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity, PrState } from '@pimp-my-pr/server/repository/core/domain';
import {
  PrRepository,
  RemotePrRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { githubConfig } from '@pimp-my-pr/server/shared/config';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { mapGithubPr } from '../mappers/map-github-pr';
import { urlWithQueryParams } from '@pimp-my-pr/shared/domain';
import { GithubPrState } from '../domain/enums/github-pr-status.enum';

@Injectable()
export class GithubPrRepository extends RemotePrRepository {
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

  findByRepositoryId(
    repositoryId: string,
    token: string,
    { prState = PrState.OPEN, page = 1, onPage = 50 } = {
      prState: PrState.OPEN,
      page: 1,
      onPage: 50
    }
  ): Promise<PrEntity[]> {
    return this.httpService
      .get<GithubPrEntity[]>(
        urlWithQueryParams(
          this.endpoints.getRepositoryPrs.url({
            fullName: repositoryId
          }),
          {
            page: page,
            state: GithubPrState[prState],
            per_page: onPage
          }
        ),
        {
          headers: { Authorization: `token ${token}` }
        }
      )
      .pipe(
        map(res => res.data),
        switchMap(prs =>
          prs.length ? forkJoin(prs.map(pr => this.get(repositoryId, pr.number, token))) : of([])
        )
      )
      .toPromise();
  }
}

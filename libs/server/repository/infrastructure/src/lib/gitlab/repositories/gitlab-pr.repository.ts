import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity, PrState } from '@pimp-my-pr/server/repository/core/domain';
import { RemotePrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { gitlabConfig } from '@pimp-my-pr/server/shared/config';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GitlabPrEntity } from '../domain/entities/gitlab-pr.entity';
import { mapGitlabPr } from '../mappers/map-gitalb-pr';
import { GitlabPrDetailsEntity } from '../domain/entities/gitlab-pr-details.entity';
import { urlWithQueryParams } from '@pimp-my-pr/shared/domain';
import { GithubPrState } from '../../github/domain/enums/github-pr-status.enum';

@Injectable()
export class GitlabPrRepository extends RemotePrRepository {
  endpoints = {
    getPr: urlFactory<'repoFullName' | 'prId'>(
      gitlabConfig.apiUrl + '/projects/:repoFullName/merge_requests/:prId',
      true
    ),
    getRepositoryPrs: urlFactory<'fullName'>(
      gitlabConfig.apiUrl + '/projects/:fullName/merge_requests',
      true
    )
  };

  constructor(private httpService: HttpService) {
    super();
  }

  get(repoFullName: string, prId: number, token: string): Promise<PrEntity> {
    return this.httpService
      .get<GitlabPrDetailsEntity>(
        this.endpoints.getPr.url({ repoFullName: encodeURIComponent(repoFullName), prId }),
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .pipe(
        map(res => res.data),
        map(mapGitlabPr),
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
      .get<GitlabPrEntity[]>(
        urlWithQueryParams(
          this.endpoints.getRepositoryPrs.url({ fullName: encodeURIComponent(repositoryId) }),
          {
            page: page,
            per_page: onPage,
            state: GithubPrState[prState]
          }
        ),
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .pipe(
        map(res => res.data),
        switchMap(prs => {
          return prs.length
            ? forkJoin(prs.map(pr => this.get(repositoryId, pr.iid, token)))
            : of([]);
        })
      )
      .toPromise();
  }
}

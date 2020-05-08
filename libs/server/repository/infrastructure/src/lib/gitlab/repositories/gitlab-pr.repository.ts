import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { gitlabConfig } from '@pimp-my-pr/server/shared/config';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GitlabPrEntity } from '../domain/entities/gitlab-pr.entity';
import { mapGitlabPr } from '../mappers/map-gitalb-pr';
import { GitlabPrDetailsEntity } from '../domain/entities/gitlab-pr-details.entity';

@Injectable()
export class GitlabPrRepository extends PrRepository {
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

  findByRepositoryId(repositoryId: string, token: string): Promise<PrEntity[]> {
    return this.httpService
      .get<GitlabPrEntity[]>(
        this.endpoints.getRepositoryPrs.url({ fullName: encodeURIComponent(repositoryId) }),
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

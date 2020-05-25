import { HttpService, Injectable } from '@nestjs/common';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/config';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { BitbucketParticipantUserEntity } from '../domain/entities/bitbucket-participant-user.entity';
import { BitbucketParticipantEntity } from '../domain/entities/bitbucket-participant.entity';
import { BitbucketPrDiffEntity } from '../domain/entities/bitbucket-pr-diff.entity';
import { BitbucketPrEntity } from '../domain/entities/bitbucket-pr.entity';
import { BitbucketPaginatedResponse } from '../domain/interfaces/bitbucket-paginated-response.interface';
import { mapBitbucketPrDetails } from '../mappers/map-bitbucket-pr-details';

@Injectable()
export class BitbucketPrRepository extends PrRepository {
  endpoints = {
    getRepositoryPrs: urlFactory<'repositoryId'>(
      bitbucketConfig.apiUrl + '/repositories/:repositoryId/pullrequests',
      true
    )
  };

  constructor(private httpService: HttpService) {
    super();
  }

  findByRepositoryId(repositoryId: string, token: string): Promise<PrEntity[]> {
    return this.getDataFromAllPages(
      this.httpService
        .get<BitbucketPaginatedResponse<BitbucketPrEntity[]>>(
          this.endpoints.getRepositoryPrs.url({ repositoryId }),
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .pipe(map(res => res.data)),
      this.getPrsFromNextPage(token)
    )
      .pipe(
        switchMap(prs =>
          prs.length ? forkJoin(prs.map(pr => this.getPrDetails(pr, token))) : of([])
        )
      )
      .toPromise();
  }

  private getPrsFromNextPage(
    token: string
  ): (nextPageUrl: string) => Observable<BitbucketPrEntity[]> {
    return (nextPageUrl: string) =>
      this.getDataFromAllPages(
        this.httpService
          .get<BitbucketPaginatedResponse<BitbucketPrEntity[]>>(nextPageUrl, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .pipe(map(res => res.data)),
        this.getPrsFromNextPage(token)
      );
  }

  private getPrDetails(pr: BitbucketPrEntity, token: string): Promise<PrEntity> {
    return forkJoin([
      this.getPrDiff(token)(pr.links.diffstat.href),
      this.getPrParticipants(pr.links.self.href, token)
    ])
      .pipe(
        map(([diff, participants]) => {
          return {
            ...pr,
            diff,
            reviewers: participants // participants contain people that commented on a pull request but are not assigned as a reviewer
          };
        }),
        map(mapBitbucketPrDetails),
        catchRequestExceptions()
      )
      .toPromise();
  }

  private getPrDiff(token: string): (prDiffUrl: string) => Observable<BitbucketPrDiffEntity[]> {
    return (prDiffUrl: string) =>
      this.getDataFromAllPages<BitbucketPrDiffEntity>(
        this.httpService
          .get<BitbucketPaginatedResponse<BitbucketPrDiffEntity[]>>(prDiffUrl, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .pipe(map(res => res.data)),
        this.getPrDiff(token)
      );
  }

  private getPrParticipants(
    prParticipantsUrl: string,
    token: string
  ): Observable<BitbucketParticipantUserEntity[]> {
    return this.httpService
      .get<{ participants: BitbucketParticipantEntity[] }>(prParticipantsUrl, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .pipe(
        map(res => res.data.participants.map(participant => participant.user)),
        catchRequestExceptions()
      );
  }

  private getDataFromAllPages<T>(
    source: Observable<BitbucketPaginatedResponse<T[]>>,
    getNextPageCallback: (nextPageUrl: string) => Observable<T[]>
  ): Observable<T[]> {
    return source.pipe(
      map(res => {
        return {
          values: res.values,
          nextPageUrl: res.next
        };
      }),
      flatMap(data =>
        forkJoin([
          of(data.values),
          data.nextPageUrl ? getNextPageCallback(data.nextPageUrl) : of([])
        ])
      ),
      map(([items, itemsFromNextPage]) => items.concat(itemsFromNextPage)),
      catchRequestExceptions()
    );
  }
}

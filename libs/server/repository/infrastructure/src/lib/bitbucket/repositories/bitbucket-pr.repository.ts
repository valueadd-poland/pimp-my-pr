import { HttpService, Injectable } from '@nestjs/common';
import { PrRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/core';
import { BitbucketPrEntity } from '../domain/entities/bitbucket-pr.entity';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { mapBitbucketPrDetails } from '../mappers/map-bitbucket-pr-details';
import { BitbucketPrDiffEntity } from '../domain/entities/bitbucket-pr-diff.entity';
import { BitbucketPaginatedResponse } from '../domain/interfaces/bitbucket-paginated-response.interface';
import { BitbucketParticipantEntity } from '../domain/entities/bitbucket-participant.entity';
import { BitbucketParticipantUserEntity } from '../domain/entities/bitbucket-participant-user.entity';

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

  findByRepository(repositoryId: string): Promise<PrEntity[]> {
    return this.getDataFromAllPages(
      this.httpService
        .get<BitbucketPaginatedResponse<BitbucketPrEntity[]>>(
          this.endpoints.getRepositoryPrs.url({ repositoryId })
        )
        .pipe(map(res => res.data)),
      this.getPrsFromNextPage
    )
      .pipe(switchMap(prs => forkJoin(prs.map(pr => this.getPrDetails(pr)))))
      .toPromise();
  }

  private getPrsFromNextPage(nextPageUrl: string): Observable<BitbucketPrEntity[]> {
    return this.getDataFromAllPages(
      this.httpService
        .get<BitbucketPaginatedResponse<BitbucketPrEntity[]>>(nextPageUrl)
        .pipe(map(res => res.data)),
      this.getPrsFromNextPage
    );
  }

  private getPrDetails(pr: BitbucketPrEntity): Promise<PrEntity> {
    return forkJoin([
      this.getPrDiff(pr.links.diffstat.href),
      this.getPrParticipants(pr.links.self.href)
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

  private getPrDiff(prDiffUrl: string): Observable<BitbucketPrDiffEntity[]> {
    return this.getDataFromAllPages<BitbucketPrDiffEntity>(
      this.httpService
        .get<BitbucketPaginatedResponse<BitbucketPrDiffEntity[]>>(prDiffUrl)
        .pipe(map(res => res.data)),
      this.getPrDiff
    );
  }

  private getPrParticipants(
    prParticipantsUrl: string
  ): Observable<BitbucketParticipantUserEntity[]> {
    return this.httpService
      .get<{ participants: BitbucketParticipantEntity[] }>(prParticipantsUrl)
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

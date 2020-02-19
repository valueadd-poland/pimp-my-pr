import { HttpService, Injectable } from '@nestjs/common';
import {
  PrEntity,
  RepositoryEntity,
  RepositoryNotFoundException,
  ReviewerEntity
} from '@pimp-my-pr/server/repository/core/domain';
import { githubConfig, PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosError, AxiosResponse } from 'axios';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { UserModelWithPr } from '../domain/interfaces/user-model-with-pr.interface';
import { CustomUserWithPrMapper } from '../mappers/custom-user-with-pr.mapper';
import { GithubPrMapper } from '../mappers/github-pr.mapper';
import { GithubRepositoryMapper } from '../mappers/github-repository.mapper';
import { GithubUserMapper } from '../mappers/github-user.mapper';
import { PrDataService } from './pr.data-service';

@Injectable()
export class RepositoryDataService {
  endpoints = {
    getRepository: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title',
      true
    ),
    getSingleRepository: urlFactory<'id'>(githubConfig.apiUrl + '/repositories/:id', true),
    getRepositoryPrs: urlFactory<'fullName'>(githubConfig.apiUrl + '/repos/:fullName/pulls', true),
    getRepositoryContributors: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title/contributors',
      true
    )
  };
  customUserWithPrMapper = new CustomUserWithPrMapper();
  prMapper = new GithubPrMapper();
  repositoryMapper = new GithubRepositoryMapper();
  userMapper = new GithubUserMapper();

  constructor(
    private httpService: HttpService,
    private prRepository: PrDataService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {}

  find(): Promise<RepositoryEntity[]> {
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
        map(this.repositoryMapper.mapFrom),
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
        map(this.repositoryMapper.mapFrom),
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

  getRepositoryPrs(repositoryFullName: string): Promise<PrEntity[]> {
    return this.getRepositoryPrsAsObservable(repositoryFullName).toPromise();
  }

  getRepositoryContributors(): Promise<ReviewerEntity[]> {
    const owner = this.pmpApiServiceConfigService.getRepositoryOwner();
    const title = this.pmpApiServiceConfigService.getRepositoryTitle();
    return this.httpService
      .get<GithubUserEntity>(this.endpoints.getRepositoryContributors.url({ owner, title }))
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(users => users.map(user => this.userMapper.mapFrom(user))),
        catchRequestExceptions()
      )
      .toPromise();
  }

  getRepositoryReviewersWithPrs(): Promise<UserModelWithPr[]> {
    const owner = this.pmpApiServiceConfigService.getRepositoryOwner();
    const repositoryTitle = this.pmpApiServiceConfigService.getRepositoryTitle();

    return this.getRepositoryPrsAsObservable(`${owner}/${repositoryTitle}`)
      .pipe(map(prs => this.groupByReviewers(prs)))
      .toPromise();
  }

  private getRepositoryPrsAsObservable(fullName: string): Observable<PrEntity[]> {
    return this.httpService
      .get<GithubPrEntity[]>(this.endpoints.getRepositoryPrs.url({ fullName }))
      .pipe(
        catchRequestExceptions(),
        map((res: AxiosResponse<GithubPrEntity[]>) => {
          return res.data;
        }),
        switchMap(prs => forkJoin(prs.map(pr => this.prRepository.get(fullName, pr.number))))
      );
  }

  private groupByReviewers(prs: PrEntity[]): UserModelWithPr[] {
    const result: { [id: string]: { reviewer: ReviewerEntity; prs: PrEntity[] } } = {};

    prs.forEach(pr =>
      pr.reviewers.forEach(reviewer => {
        result[reviewer.id] = {
          reviewer,
          prs: result[reviewer.id] ? result[reviewer.id].prs.concat(pr) : [pr]
        };
      })
    );

    return Object.keys(result).map(key =>
      this.customUserWithPrMapper.mapFrom([result[key].reviewer, result[key].prs])
    );
  }
}

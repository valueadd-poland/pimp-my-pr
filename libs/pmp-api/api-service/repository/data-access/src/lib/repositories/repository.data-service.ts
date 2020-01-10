import { HttpService, Injectable } from '@nestjs/common';
import {
  PrModel,
  RepositoryModel,
  RepositoryNotFoundException,
  UserModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { githubConfig, PmpApiServiceConfigService } from '@pimp-my-pr/pmp-api/shared/config';
import { urlFactory } from '@valueadd/typed-urls';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { catchError, map } from 'rxjs/operators';
import { GithubRepositoryMapper } from '../mappers/github-repository.mapper';
import { AxiosError, AxiosResponse } from 'axios';
import { GithubPrEntity } from '../domain/entities/github-pr.entity';
import { GithubPrMapper } from '../mappers/github-pr.mapper';
import { Observable, throwError } from 'rxjs';
import { catchRequestExceptions } from '@pimp-my-pr/pmp-api/shared/util';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/pmp-api/shared/domain';
import { GithubUserEntity } from '../domain/entities/github-user.entity';
import { GithubUserMapper } from '../mappers/github-user.mapper';

@Injectable()
export class RepositoryDataService {
  endpoints = {
    getRepository: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title',
      true
    ),
    getRepositoryPrs: urlFactory<'fullName'>(githubConfig.apiUrl + '/repos/:fullName/pulls', true),
    getRepositoryContributors: urlFactory<'owner' | 'title'>(
      githubConfig.apiUrl + '/repos/:owner/:title/contributors',
      true
    )
  };
  prMapper = new GithubPrMapper();
  repositoryMapper = new GithubRepositoryMapper();
  userMapper = new GithubUserMapper();

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

  getRepositoryPrs(repositoryFullName: string): Promise<PrModel[]> {
    return this.getRepositoryPrsAsObservable(repositoryFullName).toPromise();
  }

  getRepositoryContributors(): Promise<UserModel[]> {
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

  getRepositoryReviewers(): Promise<UserModel[]> {
    const owner = this.pmpApiServiceConfigService.getRepositoryOwner();
    const repositoryTitle = this.pmpApiServiceConfigService.getRepositoryTitle();

    return this.getRepositoryPrsAsObservable(`${owner}/${repositoryTitle}`)
      .pipe(
        map(prs =>
          this.removeDuplicateUsers(prs.map(pr => pr.reviewers).flatMap<UserModel>(users => users))
        )
      )
      .toPromise();
  }

  private getRepositoryPrsAsObservable(fullName: string): Observable<PrModel[]> {
    return this.httpService
      .get<GithubPrEntity[]>(this.endpoints.getRepositoryPrs.url({ fullName }))
      .pipe(
        map((res: AxiosResponse<GithubPrEntity[]>) => res.data),
        map(prs => prs.map(pr => this.prMapper.mapFrom(pr))),
        catchRequestExceptions()
      );
  }

  private removeDuplicateUsers(users: UserModel[]): UserModel[] {
    return [...new Map(users.map(obj => [JSON.stringify(obj), obj])).values()];
  }
}

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
import { UserModelWithPr } from '../domain/interfaces/user-model-with-pr.interface';
import { CustomUserWithPrMapper } from '../mappers/custom-user-with-pr.mapper';

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

  getSingleRepository(id: string): Promise<RepositoryModel> {
    return this.httpService
      .get<RepositoryModel>(this.endpoints.getSingleRepository.url({ id }))
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

  getRepositoryReviewersWithPrs(): Promise<UserModelWithPr[]> {
    const owner = this.pmpApiServiceConfigService.getRepositoryOwner();
    const repositoryTitle = this.pmpApiServiceConfigService.getRepositoryTitle();

    return this.getRepositoryPrsAsObservable(`${owner}/${repositoryTitle}`)
      .pipe(map(prs => this.groupByReviewers(prs)))
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

  private groupByReviewers(prs: PrModel[]): UserModelWithPr[] {
    const result: { [id: string]: { reviewer: UserModel; prs: PrModel[] } } = {};

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

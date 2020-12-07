import { HttpService, Injectable } from '@nestjs/common';
import { urlFactory } from '@valueadd/typed-urls';
import { githubConfig } from '@pimp-my-pr/server/shared/config';
import { GithubEvent } from '../domain/enums/github-event.enum';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AxiosError } from 'axios';

export interface CreateWebHookPayload {
  events: GithubEvent[];
  config: {
    url: string;
  };
}

@Injectable()
export class GithubWebHooksApiService {
  private readonly endpoints = {
    create: urlFactory<'repoFullName'>(githubConfig.apiUrl + '/repos/:repoFullName/hooks', true)
  };

  constructor(private http: HttpService) {}

  create({
    repoFullName,
    token,
    payload
  }: {
    repoFullName: string;
    token: string;
    payload: CreateWebHookPayload;
  }): Promise<void> {
    console.log(this.endpoints.create.url({ repoFullName }));
    return this.http
      .post(
        this.endpoints.create.url({ repoFullName }),
        {
          ...payload,
          name: 'web',
          config: { ...payload.config, content_type: 'json' }
        },
        {
          headers: { Authorization: `token ${token}` }
        }
      )
      .pipe(
        catchError((err: AxiosError) => {
          console.error(err.response.data);
          return throwError(err);
        })
      )
      .toPromise()
      .then();
  }
}

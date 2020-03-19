import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetGithubAccessTokenQuery } from './queries/get-github-access-token/get-github-access-token.query';
import { AuthTokenReadModel } from './read-models/auth-token.read-model';

@Injectable()
export class AuthFacade {
  constructor(private queryBus: QueryBus) {}

  getGithubAccessToken(githubCode: string): Promise<AuthTokenReadModel> {
    return this.queryBus.execute(new GetGithubAccessTokenQuery(githubCode));
  }
}

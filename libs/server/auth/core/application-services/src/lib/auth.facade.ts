import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthTokenReadModel } from './read-models/auth-token/auth-token.read-model';
import { GetAccessTokenQuery } from './queries/get-access-token.query.ts/get-access-tokent.query';
import { Platform } from '@pimp-my-pr/shared/domain';

@Injectable()
export class AuthFacade {
  constructor(private queryBus: QueryBus) {}
  getAccessToken(githubCode: string, platform: Platform): Promise<AuthTokenReadModel> {
    return this.queryBus.execute(new GetAccessTokenQuery(githubCode, platform));
  }
}

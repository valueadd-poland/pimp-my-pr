import { IQuery } from '@nestjs/cqrs';

export class GetGithubAccessTokenQuery implements IQuery {
  constructor(public githubCode: string) {}
}

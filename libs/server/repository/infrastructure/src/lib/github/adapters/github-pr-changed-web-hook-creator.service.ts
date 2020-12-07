import {
  PrChangedWebHookCreator,
  RepositoryEntity
} from '@pimp-my-pr/server/repository/core/domain';
import { Injectable } from '@nestjs/common';
import { GithubWebHooksApiService } from '../api-services/github-web-hooks-api.service';
import { GithubEvent } from '../domain/enums/github-event.enum';
import { PmpApiConfigService } from '@pimp-my-pr/server/shared/config';

@Injectable()
export class GithubPrChangedWebHookCreator implements PrChangedWebHookCreator {
  constructor(
    private webHooksApiService: GithubWebHooksApiService,
    private config: PmpApiConfigService
  ) {}

  create(repo: RepositoryEntity, token: string): Promise<void> {
    return this.webHooksApiService.create({
      repoFullName: repo.fullName,
      token,
      payload: {
        events: [GithubEvent.PullRequest],
        config: { url: `https://${this.config.getAppDomain()}/api/github/pr` }
      }
    });
  }
}

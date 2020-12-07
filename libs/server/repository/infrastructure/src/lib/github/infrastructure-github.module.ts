import { Module } from '@nestjs/common';
import { GithubWebHooksApiService } from './api-services/github-web-hooks-api.service';
import { GithubPrChangedWebHookCreator } from './adapters/github-pr-changed-web-hook-creator.service';
import { GithubRepositoryRepository } from './repositories/github-repository.repository';

@Module({
  providers: [GithubRepositoryRepository, GithubPrChangedWebHookCreator, GithubWebHooksApiService],
  exports: [GithubRepositoryRepository, GithubPrChangedWebHookCreator]
})
export class InfrastructureGithubModule {}

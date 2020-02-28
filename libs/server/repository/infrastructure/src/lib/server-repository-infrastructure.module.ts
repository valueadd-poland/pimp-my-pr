import { Module } from '@nestjs/common';
import { GithubPrRepository } from './github/repositories/github-pr.repository';
import { GithubRepositoryRepository } from './github/repositories/github-repository.repository';
import { GithubReviewerRepository } from './github/repositories/github-reviewer.repository';
import { RepositoryRepositoryAdapter } from './repositories/repository-repository.adapter';

@Module({
  providers: [
    GithubRepositoryRepository,
    GithubPrRepository,
    GithubReviewerRepository,
    RepositoryRepositoryAdapter
  ],
  exports: [GithubRepositoryRepository, GithubPrRepository, GithubReviewerRepository]
})
export class ServerRepositoryInfrastructureModule {}

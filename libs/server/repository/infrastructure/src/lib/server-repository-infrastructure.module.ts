import { Module } from '@nestjs/common';
import { GithubPrRepository } from './github/repositories/github-pr.repository';
import { GithubRepositoryRepository } from './github/repositories/github-repository.repository';
import { GithubReviewerRepository } from './github/repositories/github-reviewer.repository';

@Module({
  providers: [GithubRepositoryRepository, GithubPrRepository, GithubReviewerRepository],
  exports: [GithubRepositoryRepository, GithubPrRepository, GithubReviewerRepository]
})
export class ServerRepositoryInfrastructureModule {}

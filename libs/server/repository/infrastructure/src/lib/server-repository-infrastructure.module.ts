import { Module } from '@nestjs/common';
import { BitbucketRepositoryRepository } from './bitbucket/repositories/bitbucket-repository.repository';
import { GithubRepositoryRepository } from './github/repositories/github-repository.repository';
import { RepositoryRepositoryAdapter } from './repositories/repository-repository.adapter';
import { FeatureRepositoryTypeOrmModule } from './typeorm/feature-repository-type-orm.module';
import { GitlabRepositoryRepository } from './gitlab/repositories/gitlab-repository.repository';
import { SettingsRepositoryAdapter } from './repositories/settings-repository.adapter';

@Module({
  imports: [FeatureRepositoryTypeOrmModule],
  providers: [
    RepositoryRepositoryAdapter,
    SettingsRepositoryAdapter,
    BitbucketRepositoryRepository,
    GithubRepositoryRepository,
    GitlabRepositoryRepository
  ],
  exports: [
    FeatureRepositoryTypeOrmModule,
    BitbucketRepositoryRepository,
    GithubRepositoryRepository,
    GitlabRepositoryRepository
  ]
})
export class ServerRepositoryInfrastructureModule {}

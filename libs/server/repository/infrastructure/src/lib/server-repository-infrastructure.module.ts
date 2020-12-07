import { Module } from '@nestjs/common';
import { BitbucketRepositoryRepository } from './bitbucket/repositories/bitbucket-repository.repository';
import { RepositoryRepositoryAdapter } from './repositories/repository-repository.adapter';
import { FeatureRepositoryTypeOrmModule } from './typeorm/feature-repository-type-orm.module';
import { GitlabRepositoryRepository } from './gitlab/repositories/gitlab-repository.repository';
import { SettingsRepositoryAdapter } from './repositories/settings-repository.adapter';
import { InfrastructureGithubModule } from './github/infrastructure-github.module';

@Module({
  imports: [FeatureRepositoryTypeOrmModule, InfrastructureGithubModule],
  providers: [
    RepositoryRepositoryAdapter,
    SettingsRepositoryAdapter,
    BitbucketRepositoryRepository,
    GitlabRepositoryRepository
  ],
  exports: [
    FeatureRepositoryTypeOrmModule,
    BitbucketRepositoryRepository,
    InfrastructureGithubModule,
    GitlabRepositoryRepository
  ]
})
export class ServerRepositoryInfrastructureModule {}

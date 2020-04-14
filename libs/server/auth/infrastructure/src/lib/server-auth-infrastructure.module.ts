import { HttpModule, Module } from '@nestjs/common';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { AuthTokenRepositoryAdapter } from './repositories/auth-token-repository.adapter';
import { BitbucketAuthTokenRepository } from './repositories/bitbucket-auth-token.repository';
import { GithubAuthTokenRepository } from './repositories/github-auth-token.repository';

@Module({
  imports: [HttpModule, ServerSharedCoreModule],
  providers: [AuthTokenRepositoryAdapter, GithubAuthTokenRepository, BitbucketAuthTokenRepository],
  exports: [AuthTokenRepositoryAdapter]
})
export class ServerAuthInfrastructureModule {}

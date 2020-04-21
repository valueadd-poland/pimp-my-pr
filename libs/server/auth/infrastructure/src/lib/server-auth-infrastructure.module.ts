import { HttpModule, Module } from '@nestjs/common';
import { BitbucketAuthTokenRepository } from './repositories/bitbucket-auth-token.repository';
import { GithubAuthTokenRepository } from './repositories/github-auth-token.repository';

const providers = [GithubAuthTokenRepository, BitbucketAuthTokenRepository];

@Module({
  imports: [HttpModule],
  providers: providers,
  exports: providers
})
export class ServerAuthInfrastructureModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthFacade } from './auth.facade';
import { GetBitbucketAccessTokenHandler } from './queries/get-bitbucket-access-token/get-bitbucket-access-token.handler';
import { GetGithubAccessTokenHandler } from './queries/get-github-access-token/get-github-access-token.handler';

const QueryHandlers = [GetBitbucketAccessTokenHandler, GetGithubAccessTokenHandler];

@Module({
  imports: [CqrsModule],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}

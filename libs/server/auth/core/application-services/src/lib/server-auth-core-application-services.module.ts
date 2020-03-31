import { Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';
import { GetGithubAccessTokenHandler } from './queries/get-github-access-token/get-github-access-token.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetBitbucketAccessTokenHandler } from './queries/get-bitbucket-access-token/get-bitbucket-access-token.handler';

const QueryHandlers = [GetBitbucketAccessTokenHandler, GetGithubAccessTokenHandler];

@Module({
  imports: [CqrsModule],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}

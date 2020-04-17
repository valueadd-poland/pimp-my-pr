import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServerUserPublicModule } from '@pimp-my-pr/server/user/public';
import { AuthFacade } from './auth.facade';
import { GetBitbucketAccessTokenHandler } from './queries/get-bitbucket-access-token/get-bitbucket-access-token.handler';
import { GetGithubAccessTokenHandler } from './queries/get-github-access-token/get-github-access-token.handler';

const QueryHandlers = [GetBitbucketAccessTokenHandler, GetGithubAccessTokenHandler];

@Module({
  imports: [CqrsModule, ServerUserPublicModule],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}

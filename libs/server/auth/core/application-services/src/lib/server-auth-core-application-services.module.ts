import { Module } from '@nestjs/common';
import { AuthFacade } from './auth.facade';
import { GetGithubAccessTokenHandler } from './queries/get-github-access-token/get-github-access-token.handler';
import { CqrsModule } from '@nestjs/cqrs';

const QueryHandlers = [GetGithubAccessTokenHandler];

@Module({
  imports: [CqrsModule],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServerUserPublicModule } from '@pimp-my-pr/server/user/public';
import { AuthFacade } from './auth.facade';
import { GetAccessTokenHandler } from './queries/get-access-token.query.ts/get-access-token.handler';

const QueryHandlers = [GetAccessTokenHandler];

@Module({
  imports: [CqrsModule, ServerUserPublicModule],
  providers: [AuthFacade, ...QueryHandlers],
  exports: [AuthFacade]
})
export class ServerAuthCoreApplicationServicesModule {}

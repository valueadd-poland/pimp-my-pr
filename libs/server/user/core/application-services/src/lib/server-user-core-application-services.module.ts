import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddUserHandler } from './commands/add-user/add-user.handler';
import { GetUserInfoHandler } from './queries/get-user-info/get-user-info.handler';
import { UserFacade } from './user.facade';

@Module({
  imports: [CqrsModule],
  providers: [UserFacade, AddUserHandler, GetUserInfoHandler],
  exports: [UserFacade]
})
export class ServerUserCoreApplicationServicesModule {}

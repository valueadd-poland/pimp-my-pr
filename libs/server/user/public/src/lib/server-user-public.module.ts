import { Module } from '@nestjs/common';
import { ServerUserShellModule } from '@pimp-my-pr/server/user/shell';
import { UserPublicFacade } from './user-public.facade';

@Module({
  imports: [ServerUserShellModule],
  providers: [UserPublicFacade],
  exports: [UserPublicFacade]
})
export class ServerUserPublicModule {}

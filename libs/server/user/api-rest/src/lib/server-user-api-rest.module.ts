import { Module } from '@nestjs/common';
import { ServerUserShellModule } from '@pimp-my-pr/server/user/shell';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ServerUserShellModule],
  controllers: [UserController]
})
export class ServerUserApiRestModule {}

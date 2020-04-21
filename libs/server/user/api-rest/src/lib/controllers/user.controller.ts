import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserFacade } from '@pimp-my-pr/server/user/core/application-services';
import { GetUserInfoQuery } from '@pimp-my-pr/server/user/core/application-services';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { AuthGuard, CurrentUserId } from '@pimp-my-pr/server/auth/public';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user-info')
export class UserController {
  constructor(private userFacade: UserFacade) {}

  @Get()
  getUserInfo(@CurrentUserId() currentUserId: string): Promise<User> {
    return this.userFacade.getUserInfo(new GetUserInfoQuery(currentUserId));
  }
}

import { Controller, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, CurrentUserId } from '@pimp-my-pr/server/auth/public';
import {
  GetUserInfoQuery,
  UserFacade,
  UserReadModel
} from '@pimp-my-pr/server/user/core/application-services';
import { User } from '@pimp-my-pr/shared/domain';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user-info')
export class UserController {
  constructor(private userFacade: UserFacade) {}

  @ApiOkResponse({ type: [UserReadModel] })
  @Get()
  getUserInfo(@CurrentUserId() currentUserId: string): Promise<User> {
    return this.userFacade.getUserInfo(new GetUserInfoQuery(currentUserId)).catch(err => {
      if (err instanceof EntityNotFoundError) {
        throw new UnauthorizedException();
      }
      throw err;
    });
  }
}

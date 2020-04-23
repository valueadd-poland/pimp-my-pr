import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AuthGuard,
  Credentials,
  CurrentUserId,
  RequestCredentials
} from '@pimp-my-pr/server/auth/public';

import {
  AddRepositoryCommand,
  DeleteRepositoryCommand,
  RepositoryFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { extractFullName } from '@pimp-my-pr/server/shared/util-repository';
import { AddRepositoryDto } from '../dtos/add-repository.dto';
import { UserRepositoryGuard } from '../guards/user-repository.guard';

@ApiTags('repository')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('repository')
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(@CurrentUserId() currentUserId: string): Promise<RepositoryEntity[]> {
    return this.repositoryFacade.listRepositories(currentUserId);
  }

  @Post()
  addRepository(
    @Body() addRepositoryDto: AddRepositoryDto,
    @Credentials() credentials: RequestCredentials,
    @CurrentUserId() userId: string
  ): Promise<void> {
    return this.repositoryFacade.addRepository(
      new AddRepositoryCommand(
        extractFullName(addRepositoryDto.repositoryUrl),
        userId,
        credentials.token,
        credentials.platform,
        addRepositoryDto.maxLines,
        addRepositoryDto.maxWaitingTime
      )
    );
  }

  @UseGuards(UserRepositoryGuard)
  @Delete(':repositoryId')
  delete(@Param('repositoryId') repositoryId: string): Promise<void> {
    return this.repositoryFacade.deleteRepository(new DeleteRepositoryCommand(repositoryId));
  }
}

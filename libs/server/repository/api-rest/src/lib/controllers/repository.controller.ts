import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AuthGuard,
  Credentials,
  CurrentUserId,
  RequestCredentials
} from '@pimp-my-pr/server/auth/public';

import {
  AddRepositoryCommand,
  RepositoryFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { extractFullName } from '@pimp-my-pr/server/shared/util-repository';
import { AddRepositoryDto } from '../dtos/add-repository.dto';

@ApiTags('repository')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('repository')
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(): Promise<RepositoryEntity[]> {
    return this.repositoryFacade.listRepositories();
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
}

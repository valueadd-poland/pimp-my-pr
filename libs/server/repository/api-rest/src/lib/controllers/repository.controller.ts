import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  AddRepositoryCommand,
  RepositoryFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { AuthGuard, Credentials, RequestCredentials } from '@pimp-my-pr/server/auth/public';
import { AddRepositoryDto } from '../dtos/add-repository.dto';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

@ApiTags('repository')
@Controller('repository')
@UseGuards(AuthGuard)
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(): Promise<RepositoryEntity[]> {
    return this.repositoryFacade.listRepositories();
  }

  @Post()
  addRepository(
    @Body() addRepositoryDto: AddRepositoryDto,
    @Credentials() credentials: RequestCredentials
  ): Promise<void> {
    return this.repositoryFacade.addRepository(
      new AddRepositoryCommand(
        addRepositoryDto.repositoryName,
        credentials.token,
        credentials.platform,
        addRepositoryDto.maxLines,
        addRepositoryDto.maxWaitingTime
      )
    );
  }
}

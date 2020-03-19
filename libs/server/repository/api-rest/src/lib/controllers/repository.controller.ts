import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import {
  AddRepositoryCommand,
  RepositoryFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { AuthGuard } from '@pimp-my-pr/server/auth/public';
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
  addRepository(@Body() addRepositoryDto: AddRepositoryDto, @Res() res: Response): Promise<void> {
    return this.repositoryFacade.addRepository(
      new AddRepositoryCommand(
        addRepositoryDto.repositoryName,
        res.locals.token,
        res.locals.platform,
        addRepositoryDto.maxLines,
        addRepositoryDto.maxWaitingTime
      )
    );
  }
}

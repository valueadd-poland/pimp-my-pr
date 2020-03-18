import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AddRepositoryCommand,
  RepositoryFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { AddRepositoryDto } from '../dtos/add-repository.dto';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

@ApiTags('repository')
@Controller('repository')
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(): Promise<RepositoryEntity[]> {
    return this.repositoryFacade.listRepositories();
  }

  @Post()
  addRepository(@Body() addRepositoryDto: AddRepositoryDto): Promise<void> {
    return this.repositoryFacade.addRepository(
      new AddRepositoryCommand(addRepositoryDto.repositoryName)
    );
  }
}

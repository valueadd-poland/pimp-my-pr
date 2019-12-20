import { Controller, Get } from '@nestjs/common';
import { RepositoryFacade } from '@pimp-my-pr/pmp-api/api-service/repository/core';
import { ListRepositoriesResponse } from '@pimp-my-pr/shared/domain';

@Controller('repository')
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.list();
  }
}

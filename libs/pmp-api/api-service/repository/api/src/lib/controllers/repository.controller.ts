import { Controller, Get } from '@nestjs/common';
import { RepositoryFacade } from '@pimp-my-pr/pmp-api/api-service/repository/core';
import { ListRepositoriesResponse, ListRepositoryUsersResponse } from '@pimp-my-pr/shared/domain';

@Controller('repository')
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get()
  list(): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.list();
  }

  @Get('contributors')
  listContributors(): Promise<ListRepositoryUsersResponse> {
    return this.repositoryFacade.listContributors();
  }

  @Get('reviewers')
  listReviewers(): Promise<ListRepositoryUsersResponse> {
    return this.repositoryFacade.listReviewers();
  }
}

import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListRepositoriesQuery } from './queries/list-repositories.query';
import {
  RepositoryStatisticsReadModel,
  RepositoryUserStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { ListRepositoryUsersQuery } from './queries/list-repository-users.query';

@Injectable()
export class RepositoryFacade {
  constructor(private queryBus: QueryBus) {}

  list(): Promise<RepositoryStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoriesQuery());
  }

  listUsers(): Promise<RepositoryUserStatisticsReadModel[]> {
    return this.queryBus.execute(new ListRepositoryUsersQuery());
  }
}

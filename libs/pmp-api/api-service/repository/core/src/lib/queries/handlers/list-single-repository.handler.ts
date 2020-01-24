import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RepositoryModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { RepositoryDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { PrsService } from '../../services/prs.service';
import { ListSingleRepositoryQuery } from '../list-single-repository.query';

@QueryHandler(ListSingleRepositoryQuery)
export class ListSingleRepositoryHandler
  implements IQueryHandler<ListSingleRepositoryQuery, RepositoryModel> {
  constructor(
    private prsService: PrsService,
    private repositoryRepository: RepositoryDataService
  ) {}

  async execute(query: ListSingleRepositoryQuery): Promise<RepositoryModel> {
    return await this.repositoryRepository.getSingleRepository(query.repositoryId);
  }
}

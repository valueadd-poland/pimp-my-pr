import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetSingleRepositoryDataQuery } from './get-single-repository-data.query';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { SingleRepositoryDataReadModel } from './single-repository-data.read-model';
import { singleRepositoryDataReadModelFactory } from '../../read-models/factories/single-repository-data-read-model.factory';
import {
  getOwnerFromFullRepoName,
  getRepoNameFromFullRepoName
} from '@pimp-my-pr/server/repository/core/domain';

@QueryHandler(GetSingleRepositoryDataQuery)
export class GetSingleRepositoryDataHandler
  implements IQueryHandler<GetSingleRepositoryDataQuery, SingleRepositoryDataReadModel> {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async execute(query: GetSingleRepositoryDataQuery): Promise<SingleRepositoryDataReadModel> {
    const repository = await this.repositoryRepository.getByData(
      query.currentUserId,
      getRepoNameFromFullRepoName(query.fullName),
      getOwnerFromFullRepoName(query.fullName)
    );
    return singleRepositoryDataReadModelFactory(repository);
  }
}

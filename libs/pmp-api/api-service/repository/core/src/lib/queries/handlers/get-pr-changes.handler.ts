import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrChanges } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { PrDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';
import { GetPrChangesQuery } from '../get-pr-changes.query';

@QueryHandler(GetPrChangesQuery)
export class GetPrChangesHandler implements IQueryHandler<GetPrChangesQuery, PrChanges> {
  constructor(private prRepository: PrDataService) {}

  async execute(query: GetPrChangesQuery): Promise<PrChanges> {
    return this.prRepository.getPrChanges(query.repositoryFullName, query.prId);
  }
}

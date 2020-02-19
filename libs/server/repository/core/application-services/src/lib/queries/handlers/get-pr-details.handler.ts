import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrDataService } from '@pimp-my-pr/server/repository/infrastructure';
import { GetPrDetailsQuery } from '../get-pr-details.query';

@QueryHandler(GetPrDetailsQuery)
export class GetPrDetailsHandler implements IQueryHandler<GetPrDetailsQuery, PrEntity> {
  constructor(private prDataService: PrDataService) {}
  async execute(query: GetPrDetailsQuery): Promise<PrEntity> {
    return this.prDataService.get(query.repositoryFullName, query.prId);
  }
}

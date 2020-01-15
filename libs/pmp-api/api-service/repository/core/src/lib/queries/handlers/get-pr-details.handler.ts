import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPrDetailsQuery } from '../get-pr-details.query';
import { PrDetailsModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { PrDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';

@QueryHandler(GetPrDetailsQuery)
export class GetPrDetailsHandler implements IQueryHandler<GetPrDetailsQuery, PrDetailsModel> {
  constructor(private prDataService: PrDataService) {}
  async execute(query: GetPrDetailsQuery): Promise<PrDetailsModel> {
    return this.prDataService.getPrDetails(query.repositoryFullName, query.prId);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllExternalPRsQuery } from '../get-all-external-prs.query';
import { PR } from '@pimp-my-pr/pmp-api/project/domain';
import { PRRepository } from '@pimp-my-pr/pmp-api/project/data-access';

@QueryHandler(GetAllExternalPRsQuery)
export class GetAllExternalPRsHandler
  implements IQueryHandler<GetAllExternalPRsQuery, PR[]> {
  constructor(private repository: PRRepository) {}
  execute(query: GetAllExternalPRsQuery): Promise<PR[]> {
    return this.repository.getAllExternalPRs(query.project, query.tokens);
  }
}

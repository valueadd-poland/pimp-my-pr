import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';
import { GetUserPrsQuery } from '../get-user-prs.query';

@QueryHandler(GetUserPrsQuery)
export class GetUserPrsHandler implements IQueryHandler<GetUserPrsQuery, PrEntity[]> {
  constructor(private queryBus: QueryBus) {}

  async execute(query: GetUserPrsQuery): Promise<PrEntity[]> {
    const result: Promise<PrEntity[]>[] = [];

    for (const repository of query.repositories) {
      const userPrsPromise = this.queryBus
        .execute<GetRepositoryPrsQuery, PrEntity[]>(new GetRepositoryPrsQuery(repository.fullName))
        .then(prs => prs.filter(pr => pr.user.id === query.user.id));

      result.push(userPrsPromise);
    }

    const prModels = await Promise.all(result);
    return prModels.flatMap<PrEntity>(res => res);
  }
}

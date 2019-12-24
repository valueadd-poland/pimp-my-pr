import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GetUserPrsQuery } from '../get-user-prs.query';
import { PrModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { GetRepositoryPrsQuery } from '../get-repository-prs.query';

@QueryHandler(GetUserPrsQuery)
export class GetUserPrsHandler implements IQueryHandler<GetUserPrsQuery, PrModel[]> {
  constructor(private queryBus: QueryBus) {}

  async execute(query: GetUserPrsQuery): Promise<PrModel[]> {
    const result: Promise<PrModel[]>[] = [];

    for (const repository of query.repositories) {
      const userPrsPromise = this.queryBus
        .execute<GetRepositoryPrsQuery, PrModel[]>(new GetRepositoryPrsQuery(repository.fullName))
        .then(prs => prs.filter(pr => pr.user.id === query.user.id));

      result.push(userPrsPromise);
    }

    const prModels = await Promise.all(result);
    return prModels.flatMap<PrModel>(res => res);
  }
}

import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  PrChanges,
  PrDetailsModel,
  PrModel,
  PrStatisticsReadModel,
  PrWithChangesReadModel,
  RepositoryModel,
  RepositoryPrsStatisticsReadModel
} from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { GetPrChangesQuery } from '../queries/get-pr-changes.query';

@Injectable()
export class PrsService {
  constructor(private queryBus: QueryBus) {}

  async getPrsWithChanges(
    repository: RepositoryModel,
    prs: PrModel[]
  ): Promise<PrWithChangesReadModel[]> {
    return Promise.all(
      prs.map(
        pr =>
          new Promise<PrWithChangesReadModel>(resolve => {
            return this.queryBus
              .execute<GetPrChangesQuery, PrChanges>(
                new GetPrChangesQuery(repository.fullName, pr.id)
              )
              .then(prChanges => {
                resolve(new PrWithChangesReadModel(pr, prChanges));
              });
          })
      )
    );
  }
}

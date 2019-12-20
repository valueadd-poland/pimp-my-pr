import { IQuery } from '@nestjs/cqrs';

export class GetPrChangesQuery implements IQuery {
  constructor(public repositoryFullName, public prId: number) {}
}

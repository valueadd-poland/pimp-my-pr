import { IQuery } from '@nestjs/cqrs';

export class GetPrDetailsQuery implements IQuery {
  constructor(public repositoryFullName, public prId: number) {}
}

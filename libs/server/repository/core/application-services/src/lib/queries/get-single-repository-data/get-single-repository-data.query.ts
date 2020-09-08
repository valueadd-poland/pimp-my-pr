import { IQuery } from '@nestjs/cqrs';

export class GetSingleRepositoryDataQuery implements IQuery {
  constructor(public currentUserId: string, public fullName: string) {}
}

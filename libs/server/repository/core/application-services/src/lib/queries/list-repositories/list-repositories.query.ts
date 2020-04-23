import { IQuery } from '@nestjs/cqrs';

export class ListRepositoriesQuery implements IQuery {
  constructor(public currentUserId: string) {}
}

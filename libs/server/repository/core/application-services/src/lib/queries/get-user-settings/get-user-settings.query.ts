import { IQuery } from '@nestjs/cqrs';

export class GetUserSettingsQuery implements IQuery {
  constructor(public userId: string) {}
}

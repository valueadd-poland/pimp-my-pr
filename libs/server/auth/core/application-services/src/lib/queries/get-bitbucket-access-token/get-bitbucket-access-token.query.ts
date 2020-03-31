import { IQuery } from '@nestjs/cqrs';

export class GetBitbucketAccessTokenQuery implements IQuery {
  constructor(public bitbucketCode: string) {}
}

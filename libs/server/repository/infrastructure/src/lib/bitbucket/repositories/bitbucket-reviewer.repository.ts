import { HttpService, Injectable } from '@nestjs/common';
import { ReviewerRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { urlFactory } from '@valueadd/typed-urls';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/core';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { map } from 'rxjs/operators';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { BitbucketUserEntity } from '../domain/entities/bitbucket-user.entity';
import { mapBitbucketUser } from '../mappers/map-bitbucket-user';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

@Injectable()
export class BitbucketReviewerRepository extends ReviewerRepository {
  endpoints = {
    getUser: urlFactory<'userId'>(bitbucketConfig.apiUrl + '/users/:userId', true)
  };

  constructor(private http: HttpService) {
    super();
  }

  get(id: string): Promise<ReviewerEntity> {
    return this.http
      .get<BitbucketUserEntity>(
        this.endpoints.getUser.url({ userId: BitbucketUuidUtil.parseTo(id) })
      ) // getting users by username is deprecated in bitbucket due to privacy changes.
      .pipe(
        map(res => res.data),
        map(mapBitbucketUser),
        catchRequestExceptions()
      )
      .toPromise();
  }
}

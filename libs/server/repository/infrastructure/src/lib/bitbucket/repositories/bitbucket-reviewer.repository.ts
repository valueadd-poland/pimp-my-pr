import { plainToClass } from '@marcj/marshal';
import { HttpService, Injectable } from '@nestjs/common';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ReviewerRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/core';
import {
  BitbucketUserEntity,
  BitbucketUuidUtil,
  mapBitbucketUser
} from '@pimp-my-pr/server/shared/util-bitbucket';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { urlFactory } from '@valueadd/typed-urls';
import { map } from 'rxjs/operators';

@Injectable()
export class BitbucketReviewerRepository extends ReviewerRepository {
  endpoints = {
    getUser: urlFactory<'userId'>(bitbucketConfig.apiUrl + '/users/:userId', true)
  };

  constructor(private http: HttpService) {
    super();
  }

  get(id: string, token: string): Promise<ReviewerEntity> {
    return this.http
      .get<BitbucketUserEntity>(
        this.endpoints.getUser.url({ userId: BitbucketUuidUtil.parseTo(id) }),
        { headers: { Authorization: `Bearer ${token}` } }
      ) // getting users by username is deprecated in bitbucket due to privacy changes.
      .pipe(
        map(res => res.data),
        map(data => plainToClass(ReviewerEntity, mapBitbucketUser(data))),
        catchRequestExceptions()
      )
      .toPromise();
  }
}

import { plainToClass } from '@marcj/marshal';
import { HttpService, Injectable } from '@nestjs/common';
import { bitbucketConfig } from '@pimp-my-pr/server/shared/config';
import { BitbucketUserEntity, mapBitbucketUser } from '@pimp-my-pr/server/shared/util-bitbucket';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { urlFactory } from '@valueadd/typed-urls';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { RemoteUserRepository } from '../remote-user.repository';

@Injectable()
export class BitbucketUserRepository extends RemoteUserRepository {
  endpoints = {
    currentUser: urlFactory(bitbucketConfig.apiUrl + '/user')
  };

  constructor(private httpService: HttpService) {
    super();
  }

  getCurrentUser(token: string): Promise<User> {
    return this.httpService
      .get<BitbucketUserEntity>(this.endpoints.currentUser.url(), {
        headers: { Authorization: `Bearer ${token}` }
      })
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(data => plainToClass(User, mapBitbucketUser(data))),
        catchRequestExceptions()
      )
      .toPromise();
  }
}

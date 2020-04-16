import { HttpService, Injectable, NotImplementedException } from '@nestjs/common';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { RemoteUserRepository } from './remote-user.repository';

@Injectable()
export class BitbucketUserRepository extends RemoteUserRepository {
  endpoints = {};

  constructor(private httpService: HttpService) {
    super();
  }

  //ToDo
  getCurrentUser(token: string): Promise<User> {
    throw new NotImplementedException('BitbucketUserRepository.getCurrentUser()');
  }
}

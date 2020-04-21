import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { UserRepository } from '@pimp-my-pr/server/user/core/domain-services';
import { GetUserInfoQuery } from './get-user-info.query';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetUserInfoQuery): Promise<User> {
    const userData = await this.userRepository.findById(query.currentUserId);
    return userData;
  }
}

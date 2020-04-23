import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { User } from '@pimp-my-pr/shared/domain';
import { UserRepository } from '@pimp-my-pr/server/user/core/domain-services';
import { GetUserInfoQuery } from './get-user-info.query';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute(query: GetUserInfoQuery): Promise<User> {
    return this.userRepository.findById(query.currentUserId);
  }
}

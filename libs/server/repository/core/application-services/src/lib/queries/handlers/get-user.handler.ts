import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';
import { UserDataService } from '@pimp-my-pr/server/repository/infrastructure';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, ReviewerEntity> {
  constructor(private userRepository: UserDataService) {}
  async execute(query: GetUserQuery): Promise<ReviewerEntity> {
    return this.userRepository.getUser(query.username);
  }
}

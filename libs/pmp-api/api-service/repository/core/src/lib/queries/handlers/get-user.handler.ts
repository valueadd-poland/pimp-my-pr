import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { UserModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { UserDataService } from '@pimp-my-pr/pmp-api/api-service/repository/data-access';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, UserModel> {
  constructor(private userRepository: UserDataService) {}
  async execute(query: GetUserQuery): Promise<UserModel> {
    return this.userRepository.getUser(query.username);
  }
}

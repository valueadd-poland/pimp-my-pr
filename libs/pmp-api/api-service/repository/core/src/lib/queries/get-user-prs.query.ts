import { RepositoryModel, UserModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';

export class GetUserPrsQuery {
  constructor(public user: UserModel, public repositories: RepositoryModel[]) {}
}

import { RepositoryModel, ReviewerEntity } from '@pimp-my-pr/server/repository/core/domain';

export class GetUserPrsQuery {
  constructor(public user: ReviewerEntity, public repositories: RepositoryModel[]) {}
}

import { plainToClass } from '@marcj/marshal';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';

export const mapGithubRepository = (repo: GithubRepositoryEntity) =>
  plainToClass(RepositoryEntity, {
    ...repo,
    id: `${repo.id}`,
    owner: repo.owner.login,
    fullName: repo.full_name,
    pictureUrl: repo.owner.avatar_url
  });

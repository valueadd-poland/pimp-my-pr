import { plainToClass } from '@marcj/marshal';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GitlabRepositoryEntity } from '../domain/entities/gitlab-repository.entity';

export const mapGitlabRepository = (repo: GitlabRepositoryEntity) =>
  plainToClass(RepositoryEntity, {
    ...repo,
    id: `${repo.id}`,
    owner: repo.owner,
    fullName: repo.path,
    pictureUrl: repo.avatar_url || repo.namespace.avatar_url
  });

import { GitlabRepositoryOwnerEntity } from './gitlab-repository-owner.entity';
import { GitlabRepositoryNamespaceEntity } from './gitlab-repository-namespace.entity';

export interface GitlabRepositoryEntity {
  id: number;
  owner: GitlabRepositoryOwnerEntity | null;
  name: string;
  path: string;
  avatar_url: string | null;
  namespace: GitlabRepositoryNamespaceEntity;
}

import { GithubUserEntity } from './github-user.entity';

export interface GithubRepositoryEntity {
  owner: GithubUserEntity;
  name: string;
  full_name: string;
}

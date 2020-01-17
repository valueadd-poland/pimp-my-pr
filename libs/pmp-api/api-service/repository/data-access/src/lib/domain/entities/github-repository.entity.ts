import { GithubUserEntity } from './github-user.entity';
import { GithubOrganizationEntity } from './github-organization.entity';

export interface GithubRepositoryEntity {
  id: number;
  owner: GithubUserEntity;
  name: string;
  full_name: string;
  organization: GithubOrganizationEntity;
}

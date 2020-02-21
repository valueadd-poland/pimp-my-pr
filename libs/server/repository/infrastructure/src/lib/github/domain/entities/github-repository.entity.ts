import { GithubOrganizationEntity } from './github-organization.entity';
import { GithubUserEntity } from './github-user.entity';

export interface GithubRepositoryEntity {
  id: number;
  owner: GithubUserEntity;
  name: string;
  full_name: string;
  organization: GithubOrganizationEntity;
}

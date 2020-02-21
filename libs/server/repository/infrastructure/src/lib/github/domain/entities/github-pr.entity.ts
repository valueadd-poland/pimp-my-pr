import { GithubUserEntity } from './github-user.entity';

export interface GithubPrEntity {
  closed_at: string;
  created_at: string;
  html_url: string;
  id: number;
  number: number;
  requested_reviewers: GithubUserEntity[];
  state: 'open' | 'closed';
  title: string;
  updated_at: string;
  user: GithubUserEntity;
}

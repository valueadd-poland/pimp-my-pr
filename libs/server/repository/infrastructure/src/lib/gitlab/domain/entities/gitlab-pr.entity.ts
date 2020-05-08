import { GitlabUserEntity } from './gitlab-user.entity';

export interface GitlabPrEntity {
  closed_at: string | null;
  created_at: string;
  update_at: string | null;
  web_url: string;
  id: number;
  iid: number;
  number: number;
  assignees: GitlabUserEntity[];
  state: 'open' | 'closed';
  title: string;
  updated_at: string;
  author: GitlabUserEntity;
}

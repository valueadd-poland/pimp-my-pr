import { GithubPrEntity } from './github-pr.entity';

export interface GithubPrDetailsEntity extends GithubPrEntity {
  comments: number;
  review_comments: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

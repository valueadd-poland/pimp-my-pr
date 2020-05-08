import { GitlabPrEntity } from './gitlab-pr.entity';

// @TODO: add additions and deletions
// https://gitlab.com/gitlab-org/gitlab/-/issues/206904
export interface GitlabPrDetailsEntity extends GitlabPrEntity {
  user_notes_count: number;
  changes_count: number;
}

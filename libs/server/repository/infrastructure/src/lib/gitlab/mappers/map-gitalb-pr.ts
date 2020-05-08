import { plainToClass } from '@marcj/marshal';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GitlabPrDetailsEntity } from '../domain/entities/gitlab-pr-details.entity';
import { mapGitlabUser } from './map-gitlab-user';

export const mapGitlabPr = (pr: GitlabPrDetailsEntity) =>
  plainToClass(PrEntity, {
    ...pr,
    additions: pr.changes_count,
    changedFiles: pr.changes_count,
    closedAt: pr.closed_at,
    createdAt: pr.created_at,
    deletions: 0,
    url: pr.web_url,
    id: `${pr.id}`,
    reviewers: pr.assignees.map(mapGitlabUser),
    updatedAt: pr.updated_at,
    author: mapGitlabUser(pr.author),
    commentsCount: pr.user_notes_count
  });

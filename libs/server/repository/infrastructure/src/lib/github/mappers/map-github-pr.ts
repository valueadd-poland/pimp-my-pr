import { plainToClass } from '@marcj/marshal';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { GithubPrDetailsEntity } from '../domain/entities/github-pr-details.entity';
import { mapGithubContributor } from './map-github-contributor';

export const mapGithubPr = (pr: GithubPrDetailsEntity) =>
  plainToClass(PrEntity, {
    ...pr,
    additions: pr.additions,
    changedFiles: pr.changed_files,
    closedAt: pr.closed_at,
    createdAt: pr.created_at,
    deletions: pr.deletions,
    url: pr.html_url,
    id: `${pr.number}`,
    reviewers: pr.requested_reviewers.map(mapGithubContributor),
    updatedAt: pr.updated_at,
    author: mapGithubContributor(pr.user),
    commentsCount: pr.comments,
    reviewCommentsCount: pr.review_comments
  });

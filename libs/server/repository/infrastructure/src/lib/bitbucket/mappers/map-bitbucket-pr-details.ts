import { plainToClass } from '@marcj/marshal';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketPrDetailsEntity } from '../domain/entities/bitbucket-pr-details.entity';
import { BitbucketPrDiffEntity } from '../domain/entities/bitbucket-pr-diff.entity';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';
import { mapBitbucketAccount } from './map-bitbucket-account';
import { mapBitbucketParticipantUser } from './map-bitbucket-participant-user';

export const mapBitbucketPrDetails = (pr: BitbucketPrDetailsEntity): PrEntity => {
  const { additions, deletions } = calculatePrStats(pr.diff);

  return plainToClass(PrEntity, {
    ...pr,
    additions,
    changedFiles: pr.diff.length,
    createdAt: pr.created_on,
    deletions,
    url: pr.links.html.href,
    id: BitbucketUuidUtil.parseFrom(`${pr.id}`),
    reviewers: pr.reviewers.map(mapBitbucketParticipantUser),
    updatedAt: pr.updated_on,
    author: mapBitbucketAccount(pr.author),
    commentsCount: pr.comment_count
  });
};

function calculatePrStats(
  prDiffs: BitbucketPrDiffEntity[]
): { additions: number; deletions: number } {
  let additions = 0;
  let deletions = 0;

  prDiffs.forEach(diff => {
    additions += diff.lines_added;
    deletions += diff.lines_removed;
  });

  return { additions, deletions };
}

import { BitbucketPrDiffEntity } from './bitbucket-pr-diff.entity';
import { BitbucketPrEntity } from './bitbucket-pr.entity';

export interface BitbucketPrDetailsEntity extends BitbucketPrEntity {
  diff: BitbucketPrDiffEntity[];
}

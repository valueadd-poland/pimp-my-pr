import { BitbucketPrEntity } from './bitbucket-pr.entity';
import { BitbucketPrDiffEntity } from './bitbucket-pr-diff.entity';

export interface BitbucketPrDetailsEntity extends BitbucketPrEntity {
  diff: BitbucketPrDiffEntity[];
}

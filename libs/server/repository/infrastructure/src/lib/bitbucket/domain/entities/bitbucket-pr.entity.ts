import { HalResource } from '@pimp-my-pr/shared/domain';
import { BitbucketAccountEntity } from './bitbucket-account.entity';
import { BitbucketParticipantUserEntity } from './bitbucket-participant-user.entity';

export interface BitbucketPrEntity
  extends HalResource<
    {},
    'self' | 'comments' | 'commits' | 'diff' | 'diffstat' | 'approve' | 'decline' | 'html'
  > {
  id: number;
  title: string;
  state: 'merged' | 'suspended' | 'opened' | 'declined';
  comment_count: number;
  task_count: number;
  created_on: Date;
  updated_on: Date;
  author: BitbucketAccountEntity;
  reviewers: BitbucketParticipantUserEntity[];
  // The list of users that are collaborating on this pull request.
  // Collaborators are user that:
  //
  // * are added to the pull request as a reviewer (part of the reviewers
  // list)
  // * are not explicit reviewers, but have commented on the pull request
  // * are not explicit reviewers, but have approved the pull request
  //
  // Each user is wrapped in an object that indicates the user's role and
  // whether they have approved the pull request. For performance reasons,
  // the API only returns this list when an API requests a pull request by
  // id.
  participants: BitbucketParticipantUserEntity[];
}

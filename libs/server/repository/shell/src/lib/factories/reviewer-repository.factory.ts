import {
  BitbucketReviewerRepository,
  GithubReviewerRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const reviewerRepositoryFactoryFactory = (
  githubReviewerRepository: GithubReviewerRepository,
  bitbucketReviewerRepository: BitbucketReviewerRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubReviewerRepository;

    case Platform.bitbucket:
      return bitbucketReviewerRepository;

    default:
      throw new Error('No reviewer repository initialized');
  }
};

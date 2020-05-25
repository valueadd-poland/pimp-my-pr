import {
  BitbucketReviewerRepository,
  GithubReviewerRepository,
  GitlabReviewerRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const reviewerRepositoryFactoryFactory = (
  githubReviewerRepository: GithubReviewerRepository,
  bitbucketReviewerRepository: BitbucketReviewerRepository,
  gitlabReviewerRepository: GitlabReviewerRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubReviewerRepository;

    case Platform.bitbucket:
      return bitbucketReviewerRepository;

    case Platform.gitlab:
      return gitlabReviewerRepository;

    default:
      throw new Error('No reviewer repository initialized');
  }
};

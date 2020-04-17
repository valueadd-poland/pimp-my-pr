import {
  BitbucketPrRepository,
  GithubPrRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const prRepositoryFactoryFactory = (
  githubPrRepository: GithubPrRepository,
  bitbucketPrRepository: BitbucketPrRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubPrRepository;

    case Platform.bitbucket:
      return bitbucketPrRepository;

    default:
      throw new Error('No PR repository initialized');
  }
};

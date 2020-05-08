import {
  BitbucketPrRepository,
  GithubPrRepository,
  GitlabPrRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const prRepositoryFactoryFactory = (
  githubPrRepository: GithubPrRepository,
  bitbucketPrRepository: BitbucketPrRepository,
  gitlabPrRepository: GitlabPrRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubPrRepository;

    case Platform.bitbucket:
      return bitbucketPrRepository;

    case Platform.gitlab:
      return gitlabPrRepository;

    default:
      throw new Error('No PR repository initialized');
  }
};

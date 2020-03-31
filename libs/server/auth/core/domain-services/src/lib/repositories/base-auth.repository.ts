import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';

export abstract class BaseAuthRepository {
  abstract getBitbucketAccessToken(bitbucketCode: string): Promise<AuthTokenEntity>;
  abstract getGithubAccessToken(githubCode: string): Promise<AuthTokenEntity>;
}

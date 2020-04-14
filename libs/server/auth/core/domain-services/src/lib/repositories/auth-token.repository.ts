import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';

export abstract class AuthTokenRepository {
  abstract getBitbucketAccessToken(bitbucketCode: string): Promise<AuthTokenEntity>;
  abstract getGithubAccessToken(githubCode: string): Promise<AuthTokenEntity>;
}

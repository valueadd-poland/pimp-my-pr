export interface GithubUserEntity {
  login: string;
  id: string;
  avatar_url: string;
  type: 'User' | 'Organisation';
}

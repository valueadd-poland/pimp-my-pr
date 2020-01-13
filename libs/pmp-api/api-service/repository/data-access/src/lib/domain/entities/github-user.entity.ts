export interface GithubUserEntity {
  login: string;
  id: number;
  avatar_url: string;
  type: 'User' | 'Organisation';
  contributions: number;
}

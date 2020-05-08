export interface GitlabUserEntity {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
}

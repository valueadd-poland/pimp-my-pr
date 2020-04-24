export interface GitlabAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  error?: string;
  error_description?: string;
}

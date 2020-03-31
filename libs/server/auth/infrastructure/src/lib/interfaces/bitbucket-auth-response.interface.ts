export interface BitbucketAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  scopes: string;
  error?: string;
  error_description?: string;
}

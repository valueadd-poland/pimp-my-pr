export interface BitbucketPaginatedResponse<T = any[]> {
  values: T;
  page?: number;
  pagelen: number;
  size?: number; // optional, because sometimes it's expansive to compute
  next?: string;
}

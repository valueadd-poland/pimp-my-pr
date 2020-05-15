export interface AddRepositoryPayload {
  repositoryUrl: string;
  maxLines?: number;
  maxWaitingTime?: number;
  maxPrs?: number;
}

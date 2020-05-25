export interface EditRepositoryPayload {
  repositoryId: string;
  maxLines?: number;
  maxWaitingTime?: number;
}

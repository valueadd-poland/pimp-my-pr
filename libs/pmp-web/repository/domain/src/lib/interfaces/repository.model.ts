export interface Repository {
  id: string;
  fullName: string;
  name: string;
  owner: string;
  pictureUrl: string;
  maxLines?: number;
  maxWaitingTime?: number;
}

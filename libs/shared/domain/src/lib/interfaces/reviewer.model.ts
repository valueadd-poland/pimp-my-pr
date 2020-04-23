import { RepositoryModel } from './repository.model';

export interface ReviewerModel {
  name: string;
  avatarUrl: string;
  id: number;
  repositories: RepositoryModel[];
}

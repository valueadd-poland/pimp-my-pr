import { RepositoryModel } from './repository.model';

export interface UserModel {
  name: string;
  avatarUrl: string;
  id: number;
  repositories: RepositoryModel[];
}

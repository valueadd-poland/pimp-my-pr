import { Project } from '@pimp-my-pr/pmp-api/project/domain';
import { Observable } from 'rxjs';

export interface ExternalProjectRepository {
  getAllProjects(authToken: string): Observable<Project[]>;
}

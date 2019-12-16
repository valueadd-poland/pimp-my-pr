import { Mapper, Project } from '@pimp-my-pr/pmp-api/project/domain';
import { GithubProject } from '../domain/entities/github.project';

export class GithubProjectMapper implements Mapper<GithubProject, Project> {
  mapFrom(param: GithubProject): Project {
    return { fullName: param.full_name, name: param.name, owner: param.owner };
  }

  mapTo(param: Project): GithubProject {
    return { full_name: param.fullName, name: param.name, owner: param.owner };
  }
}

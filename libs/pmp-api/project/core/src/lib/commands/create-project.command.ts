import { Project } from '@pimp-my-pr/pmp-api/project/domain';

export class CreateProjectCommand {
  constructor(public project: Project) {}
}

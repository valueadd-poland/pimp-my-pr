import { Project, Tokens } from '@pimp-my-pr/pmp-api/project/domain';

export class GetAllExternalPRsQuery {
  constructor(public project: Project, public tokens: Tokens) {}
}

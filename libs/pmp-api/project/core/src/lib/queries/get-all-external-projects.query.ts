import { Tokens } from '@pimp-my-pr/pmp-api/project/domain';

export class GetAllExternalProjectsQuery {
  constructor(public tokens: Tokens) {}
}

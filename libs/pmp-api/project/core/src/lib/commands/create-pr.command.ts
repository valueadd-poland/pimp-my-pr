import { PR } from '@pimp-my-pr/pmp-api/project/domain';

export class CreatePRCommand {
  constructor(public pr: PR) {}
}

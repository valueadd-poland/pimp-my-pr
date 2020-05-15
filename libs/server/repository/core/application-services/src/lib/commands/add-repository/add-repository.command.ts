import { Platform } from '@pimp-my-pr/shared/domain';

export class AddRepositoryCommand {
  constructor(
    public repositoryName: string,
    public userId: string,
    public token: string,
    public platform: Platform,
    public maxLines?: number,
    public maxWaitingTime?: number,
    public maxPrs?: number
  ) {}
}

export class AddRepositoryCommand {
  constructor(
    public repositoryName: string,
    public maxLines?: number,
    public maxWaitingTime?: number
  ) {}
}

import { ITimeTrackable } from './i-time-trackable.interface';

export type TraverseCallbackType<T> = (page: number) => Promise<T[]>;

export async function traversePagesUntil<T extends ITimeTrackable>(
  callback: TraverseCallbackType<T>,
  onPage: number,
  end?: Date
): Promise<T[]> {
  let page = 1;
  let result = [];
  while (true) {
    const response = await callback(page++);
    const hasReachedLimit =
      !!end && response[response.length - 1].createdAt.getTime() < end.getTime();
    result = [
      ...result,
      ...(hasReachedLimit
        ? response.filter(entity => !end || entity.createdAt.getTime() > end.getTime())
        : response)
    ];
    if (response.length < onPage || hasReachedLimit) break;
  }
  return result;
}

export async function* traversePagesUntilGen<T extends ITimeTrackable>(
  callback: TraverseCallbackType<T>,
  onPage: number,
  end?: Date
): AsyncGenerator<T[]> {
  let page = 1;
  while (true) {
    const response = await callback(page++);
    const hasReachedLimit =
      !!end && response[response.length - 1].createdAt.getTime() < end.getTime();
    yield hasReachedLimit
      ? response.filter(entity => !end || entity.createdAt.getTime() > end.getTime())
      : response;
    if (response.length < onPage || hasReachedLimit) break;
  }
}

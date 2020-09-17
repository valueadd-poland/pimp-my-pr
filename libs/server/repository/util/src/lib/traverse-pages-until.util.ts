import { ITimeTrackable } from './i-time-trackable.interface';

export type TraverseCallbackType<T> = (page: number) => Promise<T[]>;

export async function traversePagesUntil<T extends ITimeTrackable>(
  callback: TraverseCallbackType<T>,
  onPage: number,
  end: Date
): Promise<T[]> {
  let page = 1;
  let result = [];
  while (true) {
    const response = await callback(page++);
    const hasReachedLimit = response[response.length - 1].createdAt.getTime() < end.getTime();
    result = [
      ...result,
      ...(hasReachedLimit
        ? response.filter(entity => entity.createdAt.getTime() > end.getTime())
        : response)
    ];
    if (response.length < onPage || hasReachedLimit) break;
  }
  return result;
}

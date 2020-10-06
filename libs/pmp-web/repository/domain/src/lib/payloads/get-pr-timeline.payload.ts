import { TimelineSettings } from '../..';

export interface GetPrTimelinePayload extends TimelineSettings {
  repositoryId: string;
}

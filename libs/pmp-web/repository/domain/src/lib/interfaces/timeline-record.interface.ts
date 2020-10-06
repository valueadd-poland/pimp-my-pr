export interface TimelineRecord {
  dataFrom: Date;
  sumCount: number;
  avgCount: number;
  avgWaitingTime: number;
  /**
   * This field is required to calculate total prs count in the selected time period on the timeline
   */
  closedBefore: number;
  /**
   * This field is required to calculate total prs count in the selected time period on the timeline
   */
  openedAfter: number;
}

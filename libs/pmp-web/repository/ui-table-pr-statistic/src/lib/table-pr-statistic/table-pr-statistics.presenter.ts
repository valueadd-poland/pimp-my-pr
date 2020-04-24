import { Injectable } from '@angular/core';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

@Injectable()
export class TablePrStatisticsPresenter {
  public sortData(item: PrStatistics, property: string): string | number {
    switch (property) {
      case 'author':
        return item.author.name;
      case 'comments':
        return item.commentsCount;
      case 'reviewers':
        return item.reviewers.length;
      default:
        return item[property];
    }
  }
}

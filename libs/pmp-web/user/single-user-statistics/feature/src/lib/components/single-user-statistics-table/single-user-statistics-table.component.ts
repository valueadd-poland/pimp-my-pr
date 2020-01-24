import { Component, Input } from '@angular/core';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-single-user-statistics-table',
  templateUrl: './single-user-statistics-table.component.html',
  styleUrls: ['./single-user-statistics-table.component.scss']
})
export class SingleUserStatisticsTableComponent {
  displayedColumns = ['id', 'title', 'waitingTime', 'linesToCheck', 'author', 'comments', 'link'];

  @Input()
  tableData: PrStatistics[];

  onNavigateToItem(url: string): void {
    window.open(url, '_blank');
  }
}

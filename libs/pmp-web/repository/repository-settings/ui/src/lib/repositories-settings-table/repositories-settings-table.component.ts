import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';

@Component({
  selector: 'pimp-my-pr-repositories-settings-table',
  templateUrl: './repositories-settings-table.component.html',
  styleUrls: ['./repositories-settings-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesSettingsTableComponent {
  @Input()
  set data(data: Repository[]) {
    this.dataSource = new MatTableDataSource<Repository>(data);
    this.dataSource.sort = this.sort;
  }

  @Input()
  isLoading = false;

  @Output()
  navigateToItem = new EventEmitter<Repository>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  dataSource: MatTableDataSource<Repository>;
  displayColumns = ['avatar', 'name', 'maxLines', 'maxWaitingTime'];
}

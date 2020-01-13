import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';

@Component({
  selector: 'pmp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input()
  set tableConfig(config: TableConfig<any>) {
    this._tableConfig = config;
    if (config) {
      this.displayColumns = ['avatar']
        .concat(config.columns.map(columnConfig => columnConfig.name))
        .concat(['link']);
    }
  }

  @Output()
  navigateToItem = new EventEmitter<any>();

  displayColumns: string[];
  _tableConfig: TableConfig<any>;

  onNavigateToItem(item: any): void {
    this.navigateToItem.emit(item);
  }
}

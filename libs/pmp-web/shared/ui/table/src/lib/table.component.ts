import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';

@Component({
  selector: 'pmp-shared-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input()
  tableConfig: TableConfig<any>;
}

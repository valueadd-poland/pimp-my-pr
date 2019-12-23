import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pmp-shared-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {}

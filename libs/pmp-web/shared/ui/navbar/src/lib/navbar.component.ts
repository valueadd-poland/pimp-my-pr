import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pmp-shared-ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {}

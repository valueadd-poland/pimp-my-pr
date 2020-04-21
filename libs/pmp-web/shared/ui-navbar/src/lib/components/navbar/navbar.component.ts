import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input()
  name: string;
  @Input()
  avatar: string;
  @Output()
  logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}

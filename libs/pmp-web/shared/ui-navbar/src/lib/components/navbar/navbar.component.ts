import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input()
  user: User;
  @Output()
  logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
